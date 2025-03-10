"use client";

import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page(props) {
  const router = useRouter();
  const hasRun = useRef(false);

  // 인가코드 백으로 보내는 코드
  useEffect(() => {
    console.log("useEffect 실행");

    if (!hasRun.current) {
      hasRun.current = true;

      console.log("kakaologin 함수 시작");
      const kakaoLogin = async () => {
        try {
          const code = new URL(window.location.href).searchParams.get("code");
          if (!code) {
            console.error("인가 코드가 없습니다.");
            return;
          }
          console.log("인가 코드:", code);

          const response = await axios({
            method: "GET",
            url: `http://3.37.55.176:8080/api/auth/kakao/callback`,
            // url: `http://localhost:8080/api/auth/kakao/callback`,
            withCredentials: true,
            params: { code },
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
          });

          console.log("서버 응답:", response);
          // 계속 쓸 정보들( ex: 이름) 등은 localStorage에 저장해두자
          // localStorage.setItem("name", res.data.account.kakaoName);
          // 로그인 성공 시 마이페이지로 이동
          router.push("/mypage");
        } catch (error) {
          console.error("카카오 로그인 요청 중 오류 발생:", error);
        }
      };

      kakaoLogin();
    }
  }, []);

  return (
    <>
      {/* 돌아가는 로딩 로고 추가 */}
      <h1>로그인 중입니다...</h1>
    </>
  );
}
