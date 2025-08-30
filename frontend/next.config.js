/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE_URL: 'https://api.avukatajanda.com'
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.avukatajanda.com/api/:path*'
      }
    ];
  }
}

module.exports = nextConfig
