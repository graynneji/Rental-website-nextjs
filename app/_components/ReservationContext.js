"use client";
//context api work only for client component but if you want to share state
//between the client and the server then you have to use the url
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => {
    setRange(initialState);
  };
  //a provider must be placed where it doesnt cause unnecessary rerenders

  return (
    <ReservationContext.Provider
      //return a single value using object
      value={{
        range,
        setRange,
        resetRange,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}
function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { ReservationProvider, useReservation };
