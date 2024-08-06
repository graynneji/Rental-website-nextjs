import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";
import { unstable_noStore as noStore } from "next/cache";
//move data fectch as close as possible to the place that actually needs that data
//to its own component so others can load and display while its still loading you have to add the Suspense to achieve that
async function CabinList({ filter }) {
  //opt out of cashing
  //we would have called the revalidate in the fetch but we are not using fetch we are using the supabase to call the data
  //non cache like the noStore will make the entire page non static but dynamic
  //if one of the component is opting out it will affect the entire route
  // noStore();
  const cabins = await getCabins();
  if (!cabins.length) return;

  let displayedCabins;
  if (filter === "all") displayedCabins = cabins;
  if (filter === "small")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  if (filter === "large")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {/* {cabins.map((cabin) => ( */}
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
