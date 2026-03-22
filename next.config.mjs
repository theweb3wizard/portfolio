/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.vercel.app" },
    ],
  },
};
export default nextConfig;
