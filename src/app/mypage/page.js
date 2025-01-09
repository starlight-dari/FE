import Image from "next/image";

export default function Page() {
  return (
    <>
      <h1>My Page</h1>
      <Image alt="사용자 프사" />
      <div>이름: (사용자명)</div>
      <div>
        닉네임: (닉네임)<button>수정</button>
      </div>
      <div>이메일: (이메일주소)</div>
      <div>나의 별빛</div>
      <Image alt="반려동물들 사진" />
      <button>추가</button>
    </>
  );
}
