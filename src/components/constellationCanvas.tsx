"use client";

import React, { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";

export interface Star {
  star_id: number;
  index_id: number;
  x_star: number;
  y_star: number;
  written: boolean;
  memory_id: number;
}

export interface Edge {
  startPoint: number;
  endPoint: number;
}

export interface PetData {
  petId: number;
  petName: string;
  svgPath: string;
  starList: Star[];
  edges: Edge[];
}

const ConstellationCanvas: React.FC<{
  petData: PetData;
  selectedStarId: number | null;
  onStarClick: (star: Star) => void;
}> = ({ petData, selectedStarId, onStarClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleStarClick = (star: Star) => {
    console.log(`아이디 ${star.star_id} 별이 클릭됐습니다.`);

    // 클릭된 별에 대해 반짝이는 효과 적용
    onStarClick(star);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.src = petData.svgPath;

    image.onload = () => {
      const CANVAS_SIZE = 900;
      canvas.width = CANVAS_SIZE;
      canvas.height = CANVAS_SIZE;

      const SCALE = CANVAS_SIZE / 512;

      const drawConstellation = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 이미지 그리기 (좌측 하단 기준)
        ctx.filter = "drop-shadow(5px 5px 10px rgba(205, 234, 255, 0.9))"; // 그림자 적용
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        ctx.filter = "none";

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
    <>
      <Container>
        <Canvas ref={canvasRef} />
        <StarsContainer>
          {petData.starList.map((star: Star) => (
            <StarDiv
              key={star.star_id}
              x={star.x_star * (900 / 512) - 5} // x 좌표
              y={star.y_star * (900 / 512) - 4.5} // y 좌표
              selected={selectedStarId === star.star_id}
              written={star.written}
              onClick={() => handleStarClick(star)}
            />
          ))}
        </StarsContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
  width: 900px;
  height: 900px;
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

// const flicker = keyframes`
//     0% {
//       background: radial-gradient(circle, rgba(255, 255, 200, 1) 0%, rgba(255, 223, 128, 0.5) 100%);
//       box-shadow: 0 0 10px 3px rgba(255, 223, 128, 0.7);
//     }
//     50% {
//       background: radial-gradient(circle, rgba(255, 255, 200, 0.8) 0%, rgba(255, 223, 128, 0.6) 100%);
//       box-shadow: 0 0 15px 5px rgba(255, 223, 128, 1);
//     }
//     100% {
//       background: radial-gradient(circle, rgba(255, 255, 200, 1) 0%, rgba(255, 223, 128, 0.5) 100%);
//       box-shadow: 0 0 10px 3px rgba(255, 223, 128, 0.7);
//     }
//   `;

const flicker = keyframes`
    0% {
      background: radial-gradient(circle, rgba(255, 255, 200, 1) 0%, rgba(255, 223, 128, 0.3) 100%);
      box-shadow: 0 0 15px 5px rgba(255, 223, 128, 0.5);
    }
    50% {
      background: radial-gradient(circle, rgba(255, 255, 220, 1) 0%, rgba(255, 223, 128, 0.8) 100%);
      box-shadow: 0 0 30px 10px rgba(255, 223, 128, 1);
      transform: scale(1.05);
    }
    100% {
      background: radial-gradient(circle, rgba(255, 255, 200, 1) 0%, rgba(255, 223, 128, 0.3) 100%);
      box-shadow: 0 0 15px 5px rgba(255, 223, 128, 0.5);
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
    written ? "0 0 20px 8px rgba(255, 223, 128, 0.87)" : "none"};
  background: radial-gradient(
    circle,
    rgba(255, 255, 200, 1) 0%,
    rgba(255, 223, 128, 0.5) 100%
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
        rgba(255, 255, 200, 1) 0%,
        rgba(255, 223, 128, 0.5) 100%
      );
      box-shadow: 0 0 15px 5px rgba(255, 223, 128, 1);
    `}
`;

export default ConstellationCanvas;
