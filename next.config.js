/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable compression for better performance
  compress: true,

  // Configure headers for large file uploads
  async headers() {
    return [
      {
        source: '/api/upload-video',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ];
  },

  // Image configuration
  images: {
    qualities: [100, 75],
  },
};

module.exports = nextConfig;
