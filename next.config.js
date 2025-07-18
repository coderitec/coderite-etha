/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'nft-cdn.alchemy.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
  }
