/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: {
    buildActivity: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    qualities: [100, 75],
  },
};

export default nextConfig;
