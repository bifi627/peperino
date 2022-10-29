/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ['192.168.0.106', 'peperino-backend.up.railway.app'] },
  env: {
    // theme: fs.readFileSync('./public/theme.js').toString(),
  }
}

const cacheStrategies = require("./src/lib/pwa/cacheStrategy");

const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching: cacheStrategies,
})

module.exports = withPWA(nextConfig);