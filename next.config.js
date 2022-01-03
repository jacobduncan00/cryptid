/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    ABLY_REALTIME_KEY: process.env.ABLY_REALTIME_KEY,
  },
};
