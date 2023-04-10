/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ['192.168.0.106', 'peperino-backend.up.railway.app'] },
  env: {
    // theme: fs.readFileSync('./public/theme.js').toString(),
  },
  webpack: (config) => {
    // config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm'
    config.experiments = { asyncWebAssembly: true, layers: true }
    config.module?.rules?.push({
      test: /\.wasm(\.bin)?$/,
      type: 'asset/resource',
      // generator: {
      //   filename: 'assets/[hash][ext][query]',
      // },
    });
    config.resolve = {
      ...config.resolve,
      fallback: {
        "fs": false,
        "path": false,
        "os": false,
      },
    }
    return config
  },
}

const cacheStrategies = require("./src/lib/pwa/cacheStrategy");

const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching: cacheStrategies,
})

module.exports = withPWA(nextConfig);