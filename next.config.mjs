/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "hydeparkwinterwonderland.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wembleypark.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
