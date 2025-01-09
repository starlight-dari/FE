"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          src="/starlight-logo.png"
          alt="별빛다리 로고"
          width={270}
          height={259}
          priority
        />

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button type="button" onClick={() => router.push("/login")}>
            카카오로 로그인하기
          </button>
          <button type="button" onClick={() => router.push("/mypage")}>
            마이페이지
          </button>
        </div>
      </main>
    </div>
  );
}
