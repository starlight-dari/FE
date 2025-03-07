"use client";

import React from "react";

const KakaoLoginButton = () => {
  const Rest_api_key = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

  const redirect_uri = "http://localhost:3000/api/auth/kakao/callback";

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <>
      <button
        style={{
          whiteSpace: "nowrap",
          padding: "10px 20px",
          borderRadius: "12px",
          color: "black",
          backgroundColor: "#fff",
          cursor: "pointer",
        }}
        onClick={handleLogin}
      >
        카카오로 시작하기
      </button>
    </>
  );
};

export default KakaoLoginButton;
