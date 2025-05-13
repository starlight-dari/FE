"use client";

import "../globals.css";
import styled from "styled-components";
import React, { useState } from "react";
import Header from "../../components/header";
import NewPetInfo from "../../components/newPetInfo";
import PetCoordinatesInfo from "../../components/petCoordinatesInfo";
import PetAliveOrNotModal from "../../components/petAliveOrNotModal";

export interface PetFormData {
  pet_img: File | null;
  pet_name: string;
  species: string;
  gender: string;
  birth_date: string;
  death_date: string;
  live: boolean;
  personality: string;
  nickname: string;
  selected_x: number;
  selected_y: number;
}

export default function Page() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PetFormData>({
    pet_img: null,
    pet_name: "",
    species: "",
    gender: "",
    birth_date: "",
    death_date: "",
    live: false,
    personality: "",
    nickname: "",
    selected_x: 256,
    selected_y: 256,
  });
  const [image, setImage] = useState<string | null>(null);
  const [isAlive, setIsAlive] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(true);

  const handleAlive = (status: boolean) => {
    setIsAlive(status);
    setShowModal(false);

    if (status) {
      // 살아있다면 death_date 초기화
      setFormData((prev) => ({ ...prev, death_date: "", live: true }));
    }
  };

  return (
    <>
      {showModal && <PetAliveOrNotModal onSelect={handleAlive} />}
      <Header />
      <Body>
        <Title>새 별자리 만들기</Title>
        {step === 1 ? (
          <NewPetInfo
            formData={formData}
            setFormData={setFormData}
            setImage={setImage}
            nextStep={() => setStep(2)}
            isAlive={isAlive}
          />
        ) : (
          <PetCoordinatesInfo
            formData={formData}
            setFormData={setFormData}
            petImage={image}
            prevStep={() => setStep(1)}
          />
        )}
      </Body>
      <ProgressBarWrapper>
        <CompletedBar />
        {step === 1 ? <ProgressBar /> : <CompletedBar />}
      </ProgressBarWrapper>
    </>
  );
}

const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #fff;
  padding: 50px;
  gap: 30px;
`;

const Title = styled.div`
  font-weight: 900;
  font-size: 30px;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  gap: 13px;
  position: absolute;
  bottom: 10px;
  right: 38%;
`;

const ProgressBar = styled.div`
  width: 187px;
  height: 8px;
  background: #d9d9d98c;
  border-radius: 100px;
`;

const CompletedBar = styled(ProgressBar)`
  background: #fff;
`;
