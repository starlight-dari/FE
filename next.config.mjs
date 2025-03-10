/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "starlightbucket.s3.ap-northeast-2.amazonaws.com", // ✅ 도메인 설정
        port: "",
        pathname: "/petImgs/**", // ✅ 경로 설정
      },
      { protocol: "http", hostname: "img1.kakaocdn.net" },
    ],
  },
};

export default nextConfig;
