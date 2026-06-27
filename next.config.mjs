/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '55mb',
    },
  },
  async redirects() {
    return [
      {
        source: '/favicon.ico',
        destination: '/icon',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
