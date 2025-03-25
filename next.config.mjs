/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "starlightbucket.s3.ap-northeast-2.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "starlightbucket.s3.amazonaws.com",
        port: "",
      },
      { protocol: "http", hostname: "img1.kakaocdn.net" },
      { protocol: "http", hostname: "k.kakaocdn.net" },
    ],
  },
};

export default nextConfig;
