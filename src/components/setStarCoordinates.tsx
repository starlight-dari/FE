"use client";

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
// import Image from "next/image";
import { PetFormData } from "../app/add_new_animal/page";

interface StarCoordinatesProps {
  petImage: string | null;
  formData: PetFormData;
  setFormData: React.Dispatch<React.SetStateAction<PetFormData>>;
}

interface Coordinates {
  x: number;
  y: number;
}

const ImageResizer: React.FC<{
  imageUrl: string;
  onClick: (x: number, y: number) => void;
}> = ({ imageUrl, onClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!imageUrl) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      // 원본 이미지 크기 가져오기
      const originalWidth = img.width;
      const originalHeight = img.height;

      // 비율 유지하면서 크기 조정
      let newWidth, newHeight;
      if (originalWidth > originalHeight) {
        newWidth = 512;
        newHeight = (originalHeight / originalWidth) * 512;
      } else {
        newHeight = 512;
        newWidth = (originalWidth / originalHeight) * 512;
      }

      // 캔버스 초기화 후 흰색 배경 채우기
      ctx.clearRect(0, 0, 512, 512);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 512, 512);

      // 중앙 정렬된 위치 계산
      const offsetX = (512 - newWidth) / 2;
      const offsetY = (512 - newHeight) / 2;

      // 이미지 그리기
      ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
    };
  }, []);

  // canvas 클릭 이벤트 추가
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const flippedY = 512 - y; // Y축 반전 적용

    onClick(x, flippedY);
  };

  return (
    <canvas
      ref={canvasRef}
      width={512}
      height={512}
      style={{ border: "1px solid black" }}
      onClick={handleClick}
    />
  );
};

const StarCoordinates: React.FC<StarCoordinatesProps> = ({
  formData,
  setFormData,
  petImage,
}) => {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    x: 256,
    y: 256,
  });

  const handleCanvasClick = (x: number, y: number) => {
    setCoordinates({ x, y });
    console.log(`Flipped x, y: ${x}, ${y}`);
  };

  return (
    <Container>
      {petImage ? (
        <ImageResizer imageUrl={petImage} onClick={handleCanvasClick} />
      ) : (
        <p>이미지가 없습니다.</p>
      )}
      <Dot x={coordinates.x} y={coordinates.y} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // width: 550px;
  // height: 550px;
  // background-color: #ece6f0;
  position: relative;
  margin-left: 100px;
`;

// const PetImage = styled(Image)`
//   width: 512px;
//   height: auto;
//   // cursor: move;
// `;

const Dot = styled.div<{ x: number; y: number }>`
  position: absolute;
  bottom: ${({ y }) => y - 5}px; // 점의 중심이 정확히 맞도록 약간 오프셋
  left: ${({ x }) => x - 5}px;
  width: 10px;
  height: 10px;
  background-color: #d793ff;
  border: 1px solid #ad40ec;
  border-radius: 50%;
  cursor: move;
`;

export default StarCoordinates;
