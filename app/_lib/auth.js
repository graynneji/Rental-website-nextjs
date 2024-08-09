//npm i next-auth@beta
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  //an array of providers as many
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    //if you wan to use your own credential that you would import from some database
    //you will have to use the credentails prvider
    // CredentialsProvider,
  ],
  //for the middleware and authorization. next will call this when ever a
  //user wants to access /account
  callbacks: {
    authorized({ auth, request }) {
      //retuen truei if ther s a user and false if not
      //this to convert any value to a boolean !!
      return !!auth?.user;
    },
    //connect and check if the email or id is in our supabase
    //connect to our supabase
    //create a new geust in supabase when the user signs in for the first time and if it exits dont do anything
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest)
          await createGuest({
            email: user.email,
            fullName: user.name,
          });
        return true;
      } catch {
        return false;
      }
    },
    //to get the ID
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.guest.Id;
      return session;
    },
  },
  //as you click the guest area get redirected to the login page
  pages: {
    signIn: "/login",
  },
};
export const {
  //we can call the auth function in any server component that we want
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
