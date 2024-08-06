import Link from "next/link";

function NotFound() {
  //to personalize the not found it put it in [cabinId] folder in the folder
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">Cabin could not be found :(</h1>
      <Link
        href="/"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Go back home
      </Link>
    </main>
  );
}

export default NotFound;
