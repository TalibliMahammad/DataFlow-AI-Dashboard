/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/register',
        permanent: true,
      },
    ]
  },}

export default nextConfig;