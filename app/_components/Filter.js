"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  //to get the search params on the client must come from next/navigation
  const searchParams = useSearchParams();
  //this custome hook will allow us do programatic navigation. also must come from next/navigation
  const router = useRouter();
  //grap the pathname cabins
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    //get the data into the url - we use a web api searchParams it has nothing to do with nextjs
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      {/* <button
        className="px-5 py-2 hover:bg-primary-700"
        onClick={() => handleFilter("all")}
      >
        All cabins
      </button>
      <button
        className="px-5 py-2 hover:bg-primary-700"
        onClick={() => handleFilter("small")}
      >
        1&mdash;3 guests
      </button>
      <button
        className="px-5 py-2 hover:bg-primary-700"
        onClick={() => handleFilter("medium")}
      >
        4&mdash;7 guests
      </button> */}

      <Button
        activeFilter={activeFilter}
        handleFilter={handleFilter}
        filter="all"
      >
        All cabins
      </Button>
      <Button
        activeFilter={activeFilter}
        handleFilter={handleFilter}
        filter="small"
      >
        1&mdash;3 guests
      </Button>
      <Button
        activeFilter={activeFilter}
        handleFilter={handleFilter}
        filter="medium"
      >
        4&mdash;7 guests
      </Button>
      <Button
        activeFilter={activeFilter}
        handleFilter={handleFilter}
        filter="large"
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
export default Filter;
