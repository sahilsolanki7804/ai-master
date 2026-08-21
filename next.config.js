/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api.openai.com', 'anthropic.com', 'google.com'],
  },
  headers: async () => [
    {
      source: '/api/:path*',
      headers: [
        {
          key: 'Content-Type',
          value: 'application/json',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
      ],
    },
  ],
};

module.exports = nextConfig;
