//file that contains our server actions
//this "use server" will always be called in the server it will never be lickd in th clinet
//not to define server components but server actions
"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";
export async function updateGuest(formData) {
  // all the default form data will in formData
  // console.log(formData);

  const session = await auth();
  //common practice not to use a try catch but you can just throw errors and it will be caught by the closest errorboundary
  if (!session) throw new Error("You must be logged in");
  //formData is a web api that works in the browser
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");
  const updateData = { nationality, countryFlag, nationalID };
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  //30 seconds is the duration of cache for dynamic pages
  //revalidat the cache
  //all the data will be refetched
  revalidatePath("/account/profile");
}

//if you ue the bind make sure the formData comes as the second argument or the last one
export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  //if we have a lot of data, create an object of all the data that is in the form data
  // Object.entries(formData.entries())

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    //zod library read about it
    status: "unconfirmed",
  };
  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");
  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  //stop any user from deleting bookings
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");
  revalidatePath("/account/reservations");
  //alternative revalidateTag
}

export async function updateBooking(formData) {
  //1. authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  //2. authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  const bookingId = Number(formData.get("bookingId"));
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  //3.Building update data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  //4. mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  //5. error handling
  if (error) throw new Error("Booking could not be updated");

  //6.revalidation - revalidation must come before redirect
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  //7. redirecting
  redirect("/account/reservations");
}

export async function signInAction() {
  // can get it from /api/auth/providers if you have multiple providers you can loop but we have one so we do it manually
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirect: "/" });
}
