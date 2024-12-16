// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// export default nextConfig;

// next.config.js (CommonJS format)
// import withPWA from "next-pwa";

// export default withPWA({
//   reactStrictMode: true,
//   pwa: {
//     dest: "public",
//     disable: process.env.NODE_ENV === "development",
//   },
//   webpack(config, { isServer }) {
//     // Ensure that webpack properly handles `import` and `export` in `.jsx` and `.js` files
//     config.module.rules.push({
//       test: /\.jsx?$/,
//       exclude: /node_modules/,
//       use: {
//         loader: "next-swc-loader",
//       },
//     });

//     if (!isServer) {
//       config.watchOptions = {
//         poll: 1000, // Poll every 1 second
//         aggregateTimeout: 300, // Delay before rebuilding
//       };
//     }

//     return config;
//   },
// });

// next.config.js (Temporarily disabling PWA)
// import withPWA from "next-pwa";

// export default withPWA({
//   reactStrictMode: true,
//   pwa: {
//     disable: true,
//   },
// });

// next.config.js (without PWA)

// module.exports = {
//   reactStrictMode: true,
//   webpack(config, { isServer }) {
//     // Ensure that webpack properly handles `import` and `export` in `.jsx` and `.js` files
//     config.module.rules.push({
//       test: /\.jsx?$/,
//       exclude: /node_modules/,
//       use: {
//         loader: "next-swc-loader",
//       },
//     });

//     if (!isServer) {
//       config.watchOptions = {
//         poll: 1000, // Poll every 1 second
//         aggregateTimeout: 300, // Delay before rebuilding
//       };
//     }

//     return config;
//   },
// };

/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
