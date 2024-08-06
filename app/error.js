"use client";
//error boundary needs to be a client component
//only rendering errors would be caught here errors from maybe call backs will not be caught here
//it woult catch errors that might happen in the root layout
//global-error.js will catch in the root and replace the entire layout
export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}!</p>

      <button
        onClick={reset}
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Try again
      </button>
    </main>
  );
}
