/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // hostname: "**",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        // hostname: "**",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
