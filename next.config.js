const nextConfig = {
  images: {
    domains: ["img.freepik.com", "veterinaire-tour-hassan.com"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    })
    return config;
  },
  experimental: {
    esmExternals: true,
  },
}

module.exports = nextConfig