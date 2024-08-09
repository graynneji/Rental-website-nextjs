//create our middle ware before we use the one from nextAuth
//middleware a function or code that runs before another like a code that stands in the middle
// import { NextResponse } from "next/server";

// export function middleware(request) {
//   console.log(request);
//   return NextResponse.redirect(new URL("/about", request.url));
// }

// //do the middle ware for a specific route using matcher

// export const config = {
//   matcher: ["/account"],
// };

//use middleware now from nextAuth
import { auth } from "@/app/_lib/auth";
export const middleware = auth;
export const config = {
  matcher: ["/account"],
};
