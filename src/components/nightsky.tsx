import React from "react";

const generateStars = (numStars: number) => {
  const stars = [];
  for (let i = 0; i < numStars; i++) {
    const size = Math.random() * 3 + "px"; // 1~3px 랜덤 크기
    const left = Math.random() * 100 + "%"; // 화면 랜덤 위치
    const top = Math.random() * 100 + "%";

    stars.push(
      <div
        key={i}
        className="stars"
        style={{
          width: size,
          height: size,
          left: left,
          top: top,
          position: "absolute",
          background: "white",
          borderRadius: "50%",
          opacity: Math.random() * 0.5 + 0.5, // 0.5~1 투명도
          animationDelay: Math.random() * 2 + "s", // 반짝이는 효과 랜덤 딜레이
        }}
      />
    );
  }
  return stars;
};

const NightSky = () => {
  return <div>{generateStars(150)}</div>;
};

export default NightSky;
