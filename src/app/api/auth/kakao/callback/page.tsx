"use client";

import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page() {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

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
            url: `http://${server_url}:8080/api/auth/kakao/callback`,
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
    <Body>
      <Spinner />
      <h1>로그인 중입니다...</h1>
    </Body>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
  height: 100%;
  width: 100%;
  color: #fff;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #d793ff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
