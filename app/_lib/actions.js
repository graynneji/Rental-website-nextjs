//file that contains our server actions
//this "use server" will always be called in the server it will never be lickd in th clinet
"use server";

import { signIn, signOut } from "./auth";

export async function signInAction() {
  // can get it from /api/auth/providers if you have multiple providers you can loop but we have one so we do it manually
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirect: "/" });
}
