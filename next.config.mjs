/** @type {import('next').NextConfig} */
const nextConfig = {
  // for iages that have a source from a url use this configuration file
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nmqbckwbbtwibyekyehe.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  //for static site generation by doing this below our file can generate static assets that we can deploy anywhere
  //then run npm run build
  //  thats if you have dynamic route
  //without vercel its difficult to deploy next app the out file is what you use to deploy the static file
  //except vercel where you can easily deploy next js without complication you dont need to have the static
  // the output for npm run build
  // output: "export",
};

export default nextConfig;
