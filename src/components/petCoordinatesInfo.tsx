"use client";

// import "../globals.css";
import styled from "styled-components";
import React, { useState } from "react";
import CreateStarModal from "./createStarModal";
import help from "/public/help.svg";
import goBack from "/public/chevron_left.svg";
import Image from "next/image";
import { PetFormData } from "../app/add_new_animal/page";
import StarCoordinates from "./setStarCoordinates";

interface PetCoordinatesInfoProps {
  formData: PetFormData;
  setFormData: React.Dispatch<React.SetStateAction<PetFormData>>;
  petImage: string | null;
  prevStep: () => void;
}

const PetCoordinatesInfo: React.FC<PetCoordinatesInfoProps> = ({
  formData,
  setFormData,
  petImage,
  prevStep,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Body>
        <StarCoordinates
          petImage={petImage}
          formData={formData}
          setFormData={setFormData}
        />
        <ItemWrapper>
          <TitleWrapper>
            <Title>새 별자리 만들기</Title>
            <TransparentButton onClick={openModal}>
              <Image src={help} alt="" />
            </TransparentButton>
          </TitleWrapper>
          <div>
            {formData.pet_name}의 몸 위에 점을 위치시켜 주세요.
            <br /> 사진이 직사각형이거나, 전체 사진 크기에 비해 동물이 작다면
            정사각형 모양 안에 동물이 들어오도록 위치를 조정해주세요.
          </div>
          <TransparentButton onClick={prevStep}>
            <Image src={goBack} alt="" />
          </TransparentButton>
        </ItemWrapper>
        <Button>새 별자리 만들기</Button>
      </Body>
      <CreateStarModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

const Body = styled.div`
  display: flex;
  padding: 30px;
  color: white;
  position: relative;
  align-items: center;
  gap: 150px;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 140px;
  justify-content: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  display: flex;
  align-items: center;
  gap: 3px;
`;

const TransparentButton = styled.button`
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Title = styled.span`
  font-weight: 900;
  font-size: 20px;
`;

const Button = styled.button`
  width: 146px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background: #22225e;
  color: #fff;
  cursor: pointer;
  position: absolute;
  bottom: 25px;
  right: 70px;
`;

export default PetCoordinatesInfo;
