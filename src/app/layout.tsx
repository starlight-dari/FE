import GlobalStyle from "./styles/globalStyles";
import "./globals.css";
import NightSky from "../components/nightsky";
import { Metadata } from "next";
import DynamicBackground from "./background";
import { AlbumProvider } from "../context/AlbumContext";

export const metadata: Metadata = {
  title: "별빛다리",
  description: "반려동물과의 소중한 순간을 기록하고 반짝이는 별로 간직하세요.",
  keywords: ["별빛다리", "추억", "기록", "반려동물", "별", "별자리"],
  openGraph: {
    title: "별빛다리 - 반려동물과의 소중한 순간을 기록하세요",
    description:
      "별빛다리는 반려동물과 여러분의 기억을 반짝이는 별자리로 만들어주는 서비스입니다.",
    url: process.env.NEXT_PUBLIC_SERVER_URL,
    siteName: "별빛다리",
    images: [
      {
        url: "/starlight-logo.png",
        width: 750,
        height: 750,
        alt: "별빛다리 로고",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <GlobalStyle />
        <NightSky />
        <DynamicBackground />
        <AlbumProvider>{children}</AlbumProvider>
      </body>
    </html>
  );
}
