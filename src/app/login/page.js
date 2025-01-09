"use client";

import React from "react";
import KakaoLogin from "react-kakao-login";

export default function Page() {
  const kakaoOnSuccess = async (data) => {
    console.log("success");
    console.log(data);
    const idToken = data.response.access_token; // 엑세스 토큰 백엔드로 전달
  };
  const kakaoOnFailure = (error) => {
    console.log("error");
    console.log(error);
  };

  return (
    <>
      <h1>Hello, LogIn Page!</h1>
      <KakaoLogin
        token={process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
        onLogout={console.info}
      />
    </>
  );
}
