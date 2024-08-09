//npm i next-auth@beta
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

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
};
export const {
  //we can call the auth function in any server component that we want
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);
