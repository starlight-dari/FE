"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styled from "styled-components";

const LogoutButton = () => {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "POST",
        url: `http://${server_url}:8080/api/auth/kakao/logout`,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      console.log("서버 응답:", response);
      console.log("Logout successful:", response.data.message);

      // 클라이언트 측에서 토큰 삭제
      localStorage.removeItem("authToken");

      // 로그아웃 후 처음 페이지로 리다이렉트
      router.push("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 처리 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleLogout}>로그아웃</Button>
    </>
  );
};

const Button = styled.button`
  display: flex;
  align-items: center;
  white-space: nowrap;
  color: #49454f;
  background: none;
  border: none;
  border-bottom: 1px solid #49454f;
  cursor: pointer;
  font-family: "Pretendard-Regular", sans-serif;
  font-size: 12px;
  position: absolute;
  right: 50px;
`;

export default LogoutButton;
