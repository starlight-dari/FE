import Image from "next/image";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import photoIcon from "/public/photo-icon.svg";
import { StarFormData } from "./addStarModal";

interface ImageUploadProps {
  formData: StarFormData;
  setFormData: React.Dispatch<React.SetStateAction<StarFormData>>;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const StarImageUpload: React.FC<ImageUploadProps> = ({
  formData,
  setFormData,
  setImage,
}) => {
  // const [image, setImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImagePreview(URL.createObjectURL(file));
      setFormData((prev: any) => ({
        ...prev,
        img_url: file,
      }));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImagePreview(URL.createObjectURL(file));
      setFormData((prev: any) => ({
        ...prev,
        img_url: file,
      }));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Container>
      <DropZone
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        dragging={dragging}
      >
        {imagePreview ? (
          <Preview src={imagePreview} alt="Uploaded preview" />
        ) : (
          <Placeholder>
            <Image src={photoIcon} alt="photoIcon" />
            <p style={{ fontWeight: "bold", fontSize: "20px" }}>
              사진을 올려주세요.
            </p>
            <p style={{ color: "#3A578D" }}>
              추억앨범에서 편지를 보내드릴 때
              <br />
              올려주신 반려동물의 사진을 바탕으로
              <br />
              AI 이미지가 생성될 거에요.
            </p>
          </Placeholder>
        )}
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            handleImageChange(e);
          }}
        />
      </DropZone>
      <Button onClick={handleButtonClick}>컴퓨터에서 선택하기</Button>
    </Container>
  );
};

export default StarImageUpload;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 512px;
  height: 512px;
  background-color: #d9d9d91a;
  color: #fff;
  gap: 10px;
  position: relative;
`;

const DropZone = styled.div<{ dragging: boolean }>`
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
`;

const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: #fff;
`;

const Button = styled.button`
  border: none;
  background: rgba(170, 200, 255, 0.15);
  cursor: pointer;
  padding: 10px 30px;
  color: #adc3f3;
  border-radius: 5px;
  position: absolute;
  bottom: 10px;
`;

const Preview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Input = styled.input`
  display: none;
`;
