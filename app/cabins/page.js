import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";
import CabinList from "../_components/CabinList";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";

//cache will make the data the same for all user even if something change
//this will regenerate the data in each request.
// regenerate every 1hr 3600seconds
export const revalidate = 3600;
// incremental static regeneration

export const metadata = {
  title: "Cabins",
};
export default function Page({ searchParams }) {
  console.log(searchParams);
  const filter = searchParams?.capacity ?? "all";
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className=" flex justify-end mb-8">
        <Filter />
      </div>

      {/* the Suspense needs to be outside that component that does the asynchronous work. the suspense changes when the see a promise  */}
      {/* the key when ever the value changes the suspense happens when ever whats inside is suspending */}
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}
