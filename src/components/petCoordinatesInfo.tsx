"use client";

// import "../globals.css";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import CreateStarModal from "./createStarModal";
import help from "/public/help.svg";
import goBack from "/public/chevron_left.svg";
import Image from "next/image";
import { PetFormData } from "../app/add_new_animal/page";
import StarCoordinates from "./setStarCoordinates";
import axios from "axios";
import LoadingMessage from "./loadingMessage";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [loading, setLoading] = useState(false);

  const postNewPetInfo = async (setLoading: (value: boolean) => void) => {
    try {
      setLoading(true);

      const data = new FormData();

      // 파일 및 데이터 추가
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

      console.log("POST할 FormData:", data);

      const response = await axios({
        method: "POST",
        url: `http://${server_url}:8080/pets`,
        withCredentials: true,
        data: data,
      });

      console.log("서버 응답:", response);
      router.push(`/main/${response.data.petId}`);
    } catch (error) {
      console.error("신규 반려동물 정보 추가 중 오류 발생:", error);
      alert(
        "별자리 생성에 실패했어요. 점을 다른 곳에 위치하거나 다른 사진을 이용해주세요."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    openModal();
  }, []);

  return (
    <>
      <Body>
        <StarCoordinates
          petImage={petImage}
          formData={formData}
          setFormData={setFormData}
        />
        <ItemWrapper>
          <GoBackButton onClick={prevStep}>
            <Image src={goBack} alt="" />
          </GoBackButton>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              fontSize: "22px",
            }}
          >
            <p>
              <span
                style={{
                  color: "#adc3f3",
                }}
              >
                {formData.pet_name}
              </span>
              의 몸 위에 점을 위치시켜 주세요.
            </p>
            <p>
              올려주신{" "}
              <span
                style={{
                  color: "#adc3f3",
                }}
              >
                {formData.pet_name}
              </span>
              의 사진을 바탕으로 별자리 모양이 생성될 거에요.
            </p>
            <HelpButton onClick={openModal}>
              <Image src={help} alt="" />
            </HelpButton>
          </div>
        </ItemWrapper>
        <Button onClick={() => postNewPetInfo(setLoading)}>
          새 별자리 만들기
        </Button>
      </Body>
      <CreateStarModal isOpen={isModalOpen} onClose={closeModal} />
      <LoadingMessage isOpen={loading} />
    </>
  );
};

const Body = styled.div`
  width: 1122px;
  height: 552px;
  display: flex;
  padding: 30px;
  color: #fff;
  position: relative;
  align-items: center;
  gap: 100px;
  background: linear-gradient(to bottom, #d9d9d91a 0%, #7373731a 100%);
  border-radius: 10px;
`;

const ItemWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const TransparentButton = styled.button`
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const GoBackButton = styled(TransparentButton)`
  position: absolute;
  left: -26px;
  top: 26px;
`;

const HelpButton = styled(TransparentButton)``;

const Button = styled.button`
  width: 146px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background: rgba(170, 200, 255, 0.15);
  color: #adc3f3;
  cursor: pointer;
  position: absolute;
  bottom: 50px;
  right: 70px;
`;

export default PetCoordinatesInfo;
