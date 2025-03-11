"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import axios from "axios";
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

const StarCoordinates: React.FC<StarCoordinatesProps> = ({
  formData,
  setFormData,
  petImage,
}) => {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    x: 256,
    y: 256,
  });

  // 좌표 클릭 handler
  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    const { offsetX, offsetY } = e.nativeEvent;
    // 512px * 512px 이미지를 기준으로 좌표를 계산
    const x = offsetX;
    const y = offsetY;
    const flippedY = 512 - offsetY; // Y축을 반전
    setCoordinates({ x, y: flippedY });
    console.log(`x, y: ${x}, ${y}`);

    console.log("전달하는 y값은 변경해준다");
    console.log(`Flipped x, y: ${x}, ${flippedY}`);
  };

  // 이미지와 좌표 전송 handler
  // const handleSubmit = async (): Promise<void> => {
  //   if (coordinates) {
  //     const formData = new FormData();
  //     formData.append("coordinates", JSON.stringify(coordinates));

  //     try {
  //       const response = await axios.post(
  //         "http://localhost:5000/upload",
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );
  //       console.log("서버 응답:", response.data);
  //     } catch (error) {
  //       console.error("업로드 실패:", error);
  //     }
  //   }
  // };

  return (
    <Container>
      <PetImage
        src={petImage || "/photo-icon.svg"}
        alt="Uploaded pet image"
        width={512}
        height={0}
        onClick={handleClick}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
      />
      <Dot x={coordinates.x} y={coordinates.y} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 550px;
  height: 550px;
  background-color: #ece6f0;
  position: relative;
  margin-left: 100px;
`;

const PetImage = styled(Image)`
  width: 512px;
  height: auto;
  // cursor: move;
`;

const Dot = styled.div<{ x: number; y: number }>`
  position: absolute;
  bottom: ${({ y }) => y - 54}px; // 점의 중심이 정확히 맞도록 약간 오프셋
  left: ${({ x }) => x - 1}px;
  width: 10px;
  height: 10px;
  background-color: #d793ff;
  border: 1px solid #ad40ec;
  border-radius: 50%;
  cursor: move;
`;

export default StarCoordinates;
