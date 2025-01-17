"use client";

import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page(props) {
  const router = useRouter();

  //   const redirect_uri = "http://localhost:3000/api/auth/kakao/callback";

  // 인가코드 백으로 보내는 코드
  useEffect(() => {
    const kakaoLogin = async () => {
      const code = new URL(window.location.href).searchParams.get("code");

      await axios({
        method: "GET",
        // url: `http://localhost:8080/api/auth/kakao/callback`,
        url: `http://localhost:3000/api/auth/kakao/callback`,
        params: { code },
        headers: {
          "Content-Type": "application/json;charset=utf-8", // json형태로 데이터를 보내겠다는뜻
          "Access-Control-Allow-Origin": "*", // 이건 cors 에러때문에 넣어둔것. 프로젝트에 맞게 지워도됨
        },
      }).then((res) => {
        // 백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면
        console.log("res:", res);
        // 계속 쓸 정보들( ex: 이름) 등은 localStorage에 저장해두자
        // localStorage.setItem("name", res.data.account.kakaoName);
        // 로그인이 성공하면 마이페이지로 이동
        router.push("/mypage");
        console.log(code);
      });
    };
    kakaoLogin();
  }, []);

  return (
    <>
      {/* 돌아가는 로고 넣으면 좋을 듯 */}
      <h1>로그인 중입니다.</h1>
    </>
  );
}
