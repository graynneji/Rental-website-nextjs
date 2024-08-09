"use client";
import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";
import { deleteBooking } from "../_lib/actions";

export default function ReservationList({ bookings }) {
  //optimisticDelete is similar to the dispatch function in the useReducer hook
  //it triggers the optimistic operation
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);

      //if youre adding to the list or database optimistically do this
      //   [...curBookings, newBooking]
    }
  );
  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }
  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}
