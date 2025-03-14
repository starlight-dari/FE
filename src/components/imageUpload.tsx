import Image from "next/image";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import photoIcon from "/public/photo-icon.svg";
import { PetFormData } from "../app/add_new_animal/page";

interface ImageUploadProps {
  formData: PetFormData;
  setFormData: React.Dispatch<React.SetStateAction<PetFormData>>;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
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
        pet_img: file,
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
        pet_img: file.name,
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
              사진을 업로드해주세요.
            </p>
            <p style={{ color: "#3A578D" }}>
              올려주신 반려동물의 사진을 바탕으로 별자리 모양이 생성돼요.
              <br />
              또, 추억앨범에서 편지를 보내드릴 때<br />
              AI 이미지 생성에도 이 사진이 사용될 거에요.
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

export default ImageUpload;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 460px;
  height: 535px;
  background-color: #ece6f0;
  color: black;
  border: 1px dashed #65558f;
  gap: 10px;
  position: relative;
  margin-left: 100px;
`;

const DropZone = styled.div<{ dragging: boolean }>`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  padding: 20px;
  text-align: center;
  cursor: pointer;
`;

const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  border: none;
  background: #22225e;
  cursor: pointer;
  padding: 10px 30px;
  color: #fff;
  border-radius: 5px;
  position: absolute;
  bottom: 10px;
`;

const Preview = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 5px;
`;

const Input = styled.input`
  display: none;
`;
