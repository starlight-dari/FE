/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  compiler: {
    styledComponents: true, // styled-components 활성화
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "starlightbucket2.s3.ap-northeast-2.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "starlightbucket2.s3.amazonaws.com",
        port: "",
      },
      { protocol: "http", hostname: "img1.kakaocdn.net" },
      { protocol: "http", hostname: "k.kakaocdn.net" },
    ],
  },
};

export default nextConfig;
