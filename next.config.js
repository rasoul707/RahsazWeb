// next.config.js

module.exports = {
  // serverless: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config;
  },
  images: {
    domains: ['api.zl50.ir'],
  },
};
