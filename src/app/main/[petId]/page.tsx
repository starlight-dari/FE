"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../../components/header";
import styled, { css, keyframes } from "styled-components";

interface Star {
  star_id: number;
  index_id: number;
  x_star: number;
  y_star: number;
  written: boolean;
}

interface Edge {
  startPoint: number;
  endPoint: number;
}

interface PetData {
  petId: number;
  svgPath: string;
  starList: Star[];
  edges: Edge[];
}

const ConstellationCanvas: React.FC<{ petData: PetData }> = ({ petData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedStarId, setSelectedStarId] = useState<number | null>(null); // 클릭한 별의 star_id를 추적

  const handleStarClick = (starId: number) => {
    // 클릭된 별에 대해 반짝이는 효과 적용
    setSelectedStarId(starId);
    console.log(`아이디 ${starId} 별이 클릭됐습니다.`);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.src = petData.svgPath;

    image.onload = () => {
      const CANVAS_SIZE = 700;
      canvas.width = CANVAS_SIZE;
      canvas.height = CANVAS_SIZE;

      const SCALE = CANVAS_SIZE / 512;

      const drawConstellation = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 이미지 그리기 (좌측 하단 기준)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // 간선 그리기
        petData.edges.forEach((edge: Edge) => {
          const startStar = petData.starList.find(
            (star) => star.index_id === edge.startPoint
          );
          const endStar = petData.starList.find(
            (star) => star.index_id === edge.endPoint
          );

          if (startStar && endStar) {
            ctx.beginPath();
            ctx.moveTo(startStar.x_star * SCALE, startStar.y_star * SCALE);
            ctx.lineTo(endStar.x_star * SCALE, endStar.y_star * SCALE);
            // ctx.strokeStyle = "#A1CFFF"; // 간선 색상
            ctx.strokeStyle = `rgba(255, 255, 255, 1)`;
            ctx.lineWidth = 2 * SCALE; // 간선 두께
            ctx.stroke();
            ctx.closePath();
          }
        });
      };

      drawConstellation();
    };
  }, [petData]);

  return (
    <Container>
      <Canvas ref={canvasRef} />
      <StarsContainer>
        {petData.starList.map((star: Star) => (
          <StarDiv
            key={star.star_id}
            x={star.x_star * (700 / 512) - 5} // x 좌표
            y={star.y_star * (700 / 512) - 4.5} // y 좌표
            selected={selectedStarId === star.star_id}
            written={star.written}
            onClick={() => handleStarClick(star.star_id)}
          />
        ))}
      </StarsContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 700px;
  height: 700px;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
`;

const StarsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const flicker = keyframes`
  0% {
    background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(161, 207, 255, 0.5) 100%);
    box-shadow: 0 0 10px 3px rgba(161, 207, 255, 0.7);
  }
  50% {
    background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(161, 207, 255, 0.6) 100%);
    box-shadow: 0 0 15px 5px rgba(161, 207, 255, 1);
  }
  100% {
    background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(161, 207, 255, 0.5) 100%);
    box-shadow: 0 0 10px 3px rgba(161, 207, 255, 0.7);
  }
`;

// 별 스타일
const StarDiv = styled.div<{
  x: number;
  y: number;
  selected: boolean;
  written: boolean;
}>`
  position: absolute;
  left: ${({ x, selected }) => `${selected ? x - 3 : x}px`};
  top: ${({ y, selected }) => `${selected ? y - 5 : y}px`};
  width: ${({ selected }) => (selected ? "17px" : "10px")};
  height: ${({ selected }) => (selected ? "17px" : "10px")};
  border-radius: 100%;
  cursor: pointer;
  pointer-events: all;
  box-shadow: ${({ written }) =>
    written ? "0 0 10px 3px rgba(161, 207, 255, 0.7)" : "none"};
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 0%,
    rgba(161, 207, 255, 0.5) 100%
  );
  animation: ${({ selected }) =>
    selected
      ? css`
          ${flicker} 1s infinite;
        `
      : "none"};

  ${({ selected }) =>
    selected &&
    css`
      background: radial-gradient(
        circle,
        rgba(255, 255, 255, 1) 0%,
        rgba(161, 207, 255, 0.5) 100%
      );
      box-shadow: 0 0 15px 5px rgba(161, 207, 255, 1);
    `}
`;

export default function Page() {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  const params = useParams();
  const petId = Number(params.petId);

  const [petData, setPetData] = useState<PetData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPetStarInfo = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `http://${server_url}:8080/pets/${petId}/stars`,
          //   withCredentials: true,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        });

        console.log("서버 응답:", response);
        setPetData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("반려동물의 별자리 요청 중 오류 발생:", error);
        setLoading(false);
      }
    };
    getPetStarInfo();
  }, [petId]);

  if (loading) return <p>로딩 중...</p>;
  if (!petData) return <p>데이터를 불러올 수 없습니다.</p>;

  return (
    <>
      <Header />
      <Body>
        <ConstellationCanvas petData={petData} />
      </Body>
    </>
  );
}

const Body = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;
