"use client";

import React from "react";
import styled from "styled-components";

const KakaoLoginButton = () => {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  const Rest_api_key = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

  const redirect_uri = `http://${server_url}:3000/api/auth/kakao/callback`;

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <>
      <Button onClick={handleLogin}>카카오로 시작하기</Button>
    </>
  );
};

const Button = styled.button`
  white-space: nowrap;
  padding: 10px 20px;
  border-radius: 7px;
  color: black;
  background-color: #fee500;
  cursor: pointer;
  font-family: "Pretendard-Regular", sans-serif;
`;

export default KakaoLoginButton;
