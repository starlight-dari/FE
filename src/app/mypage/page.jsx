"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div
      style={{
        width: "1oovw",
        height: "100vh",
        backgroundColor: "#100E0E",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "1085px",
          height: "565px",
          backgroundColor: "#ECE6F0",
          borderRadius: "15px",
          padding: "41px",
        }}
      >
        {/* <Image style={{ width: "220px", height: "240px" }} alt="사용자 프사" /> */}
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "220px",
              height: "240px",
              backgroundColor: "white",
              borderRadius: "15px",
            }}
          />
          <div
            style={{
              marginLeft: "38px",
              height: "240px",
              display: "flex",
              flexDirection: "column",
              alignContent: "space-around",
            }}
          >
            <div>이름: (사용자명)</div>
            <div>
              닉네임: (닉네임)<button>수정</button>
            </div>
            <div>이메일: (이메일주소)</div>
          </div>
        </div>
        <div>나의 별빛</div>
        <Image alt="반려동물들 사진" />
        <button type="button" onClick={() => router.push("/add_new_animal")}>
          추가
        </button>
        <div>추억이 담긴 물건</div>
        <Image alt="추억이 담긴 물건 사진" />
        <button>추가</button>
      </div>
    </div>
  );
}
