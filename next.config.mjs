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
    HOST: process.env.HOST,
  },
  webpack: (config) => {
    config.cache = false; // Disables persistent caching
    return config;
  },
};

export default nextConfig;
