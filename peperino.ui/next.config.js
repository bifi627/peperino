/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    // theme: fs.readFileSync('./public/theme.js').toString(),
  }
}

const cacheStrategies = require("./src/lib/pwa/cacheStrategy");

const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching: cacheStrategies,
})

const { withAxiom } = require('next-axiom')

module.exports = withAxiom(withPWA(nextConfig));