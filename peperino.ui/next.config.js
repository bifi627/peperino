/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    // theme: fs.readFileSync('./public/theme.js').toString(),
  }
}

module.exports = nextConfig
