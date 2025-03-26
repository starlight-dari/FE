import Image from "next/image";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import photoIcon from "/public/photo-icon.svg";
import { PetFormData } from "../app/add_new_animal/page";
import { resizeImage } from "./resizeImage";

interface ImageUploadProps {
  formData: PetFormData;
  setFormData: React.Dispatch<React.SetStateAction<PetFormData>>;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const PetImageUpload: React.FC<ImageUploadProps> = ({
  formData,
  setFormData,
  setImage,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const resizedFile = await resizeImage(file, 512);
      setImage(URL.createObjectURL(file));
      setImagePreview(URL.createObjectURL(file));
      setFormData((prev: any) => ({
        ...prev,
        pet_img: resizedFile,
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
      const resizedFile = resizeImage(file, 512);
      setImage(URL.createObjectURL(file));
      setImagePreview(URL.createObjectURL(file));
      setFormData((prev: any) => ({
        ...prev,
        pet_img: resizedFile,
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
            <p style={{ fontSize: "20px", color: "#fff" }}>
              반려동물의 사진을 올려주세요.
            </p>
            <p style={{ color: "#ADC3F3" }}>
              올려주신 반려동물의 사진을 바탕으로 별자리 모양이 생성돼요.
              <br />
              별자리가 생성된 뒤에는 사진을 수정할 수 없으니 신중하게
              골라주세요!
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
      <Button onClick={handleButtonClick} photoUploaded={imagePreview !== null}>
        컴퓨터에서 선택하기
      </Button>
    </Container>
  );
};

export default PetImageUpload;

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
  gap: 20px;
`;

const Button = styled.button<{ photoUploaded: boolean }>`
  border: none;
  background: ${({ photoUploaded }) =>
    photoUploaded ? "#374151" : "rgba(170, 200, 255, 0.15)"};
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
