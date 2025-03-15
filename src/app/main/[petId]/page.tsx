"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../../components/header";
import styled from "styled-components";

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !petData) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.src = petData.svgPath;

    let alpha = 1; // 투명도 (0 ~ 1)
    let increasing = false; // 밝아지는지 여부

    image.onload = () => {
      // 캔버스 크기 설정 (이미지 크기에 맞추려면 이미지의 width, height 사용)
      // canvas.width = image.width;
      // canvas.height = image.height;
      const CANVAS_SIZE = 700;
      canvas.width = CANVAS_SIZE;
      canvas.height = CANVAS_SIZE;

      const SCALE = CANVAS_SIZE / 512;

      const drawConstellation = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 이미지 그리기 (좌측 하단 기준)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // 간선 그리기
        petData.edges.forEach((edge) => {
          const startStar = petData.starList.find(
            (s) => s.index_id === edge.startPoint
          );
          const endStar = petData.starList.find(
            (s) => s.index_id === edge.endPoint
          );

          if (startStar && endStar) {
            ctx.beginPath();
            ctx.moveTo(startStar.x_star * SCALE, startStar.y_star * SCALE);
            ctx.lineTo(endStar.x_star * SCALE, endStar.y_star * SCALE);
            // ctx.strokeStyle = `rgba(123, 167, 255, ${alpha})`;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 2 * SCALE;
            ctx.stroke();
            ctx.closePath();
          }
        });

        // 별점 그리기
        petData.starList.forEach((star) => {
          ctx.beginPath();
          ctx.arc(
            star.x_star * SCALE,
            star.y_star * SCALE,
            4 * SCALE,
            0,
            Math.PI * 2
          );

          // 그라디언트 효과 추가
          const gradient = ctx.createRadialGradient(
            star.x_star * SCALE,
            star.y_star * SCALE,
            0,
            star.x_star * SCALE,
            star.y_star * SCALE,
            6 * SCALE
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`); // 중심은 흰색
          gradient.addColorStop(1, `rgba(161, 207, 255, ${alpha * 0.5})`); // 바깥쪽 푸른빛

          if (star.written) {
            ctx.fillStyle = gradient;
          } else {
            ctx.fillStyle = `#aac8ff`;
          }
          // 💡 Glow 효과 추가 (별이 반짝이는 느낌)
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#A1CFFF";
          ctx.fill();
          ctx.closePath();
        });
      };
      // 별 반짝이는 효과
      const flickerInterval = setInterval(() => {
        if (increasing) {
          alpha += 0.05;
          if (alpha >= 1) increasing = false;
        } else {
          alpha -= 0.05;
          if (alpha <= 0.5) increasing = true;
        }
        drawConstellation();
      }, 100);

      drawConstellation();

      return () => clearInterval(flickerInterval);
    };
  }, [petData]);

  return (
    <canvas
      ref={canvasRef}
      width={700}
      height={700}
      style={{ background: "transparent" }}
    />
  );
};

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
