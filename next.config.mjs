const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // This allows all paths under the domain
      },
    ],
  },
  env: {
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
  },
  webpack: (config) => {
    config.cache = false; // Disables persistent caching
    return config;
  },
};

export default nextConfig;
