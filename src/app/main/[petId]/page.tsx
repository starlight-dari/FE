"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

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

    image.onload = () => {
      // 캔버스 크기 설정 (이미지 크기에 맞추려면 이미지의 width, height 사용)
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 이미지 그리기 (좌측 하단 기준)
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // 별점 그리기
      petData.starList.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x_star, star.y_star, 5, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
      });

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
          ctx.moveTo(startStar.x_star, startStar.y_star);
          ctx.lineTo(endStar.x_star, endStar.y_star);
          ctx.strokeStyle = "white";
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.closePath();
        }
      });
    };
  }, [petData]);

  return (
    <canvas
      ref={canvasRef}
      width={512}
      height={512}
      style={{ background: "black" }}
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

  return <ConstellationCanvas petData={petData} />;
}
