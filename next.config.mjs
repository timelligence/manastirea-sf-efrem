/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['192.168.0.100', 'localhost', '127.0.0.1'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;

