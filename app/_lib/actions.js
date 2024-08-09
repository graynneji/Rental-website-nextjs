//file that contains our server actions
//this "use server" will always be called in the server it will never be lickd in th clinet
//not to define server components but server actions
"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

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
export async function signInAction() {
  // can get it from /api/auth/providers if you have multiple providers you can loop but we have one so we do it manually
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirect: "/" });
}
