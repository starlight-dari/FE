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
import axios from "axios";

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
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const postNewPetInfo = async () => {
    try {
      const data = new FormData();

      // 파일 및 데이터 추가
      // data.append("pet_img", formData.pet_img); // 파일 객체로 추가
      if (formData.pet_img) {
        data.append("pet_img", formData.pet_img);
      }
      data.append("pet_name", formData.pet_name);
      data.append("species", formData.species);
      data.append("gender", formData.gender);
      data.append("birth_date", formData.birth_date || "");
      data.append("death_date", formData.death_date || "");
      data.append("personality", formData.personality || "");
      if (formData.selected_x)
        data.append("selected_x", String(formData.selected_x));
      if (formData.selected_y)
        data.append("selected_y", String(formData.selected_y));

      const response = await axios({
        method: "POST",
        url: `http://${server_url}:8080/pets`,
        withCredentials: true,
        // headers: {
        //   "Content-Type": " multipart/form-data",
        // },
        // data: {
        //   formData,
        // },
        data: data,
      });

      console.log("서버 응답:", response);
    } catch (error) {
      console.error("신규 반려동물 정보 추가 중 오류 발생:", error);
    }
  };

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
            {formData.pet_name}의 몸 위에 점을 위치시켜 주세요. <br />
            올려주신 {formData.pet_name}의 사진을 바탕으로 별자리 모양이 생성될
            거에요.
          </div>
          <TransparentButton onClick={prevStep}>
            <Image src={goBack} alt="" />
          </TransparentButton>
        </ItemWrapper>
        <Button onClick={postNewPetInfo}>새 별자리 만들기</Button>
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
