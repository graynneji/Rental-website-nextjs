"use client";
import { useState } from "react";
export default function Counter({ user }) {
  const [counter, setCounter] = useState(0);
  return (
    <>
      <p>{user.length}</p>
      <button onClick={() => setCounter(counter + 1)}>{counter}</button>;
    </>
  );
}
