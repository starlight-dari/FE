"use client";

import "../globals.css";
import styled from "styled-components";
import React, { useState } from "react";
import Header from "../../components/header";
import NewPetInfo from "../../components/newPetInfo";
import PetCoordinatesInfo from "../../components/petCoordinatesInfo";

export interface PetFormData {
  pet_img: string;
  pet_name: string;
  species: string;
  gender: string;
  birth_date: string;
  death_date: string;
  personality: string;
}

export default function Page() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PetFormData>({
    pet_img: "",
    pet_name: "",
    species: "",
    gender: "",
    birth_date: "",
    death_date: "",
    personality: "",
  });
  const [image, setImage] = useState<string | null>(null);

  return (
    <>
      <Header />
      {step === 1 ? (
        <NewPetInfo
          formData={formData}
          setFormData={setFormData}
          setImage={setImage}
          nextStep={() => setStep(2)}
        />
      ) : (
        <PetCoordinatesInfo
          formData={formData}
          setFormData={setFormData}
          petImage={image}
          prevStep={() => setStep(1)}
        />
      )}
      <ProgressBarWrapper>
        <CompletedBar />
        {step === 1 ? <ProgressBar /> : <CompletedBar />}
      </ProgressBarWrapper>
    </>
  );
}

const ProgressBarWrapper = styled.div`
  display: flex;
  gap: 13px;
  position: absolute;
  bottom: 10px;
  right: 36%;
`;

const ProgressBar = styled.div`
  width: 187px;
  height: 8px;
  background: #d9d9d98c;
  border-radius: 100px;
`;

const CompletedBar = styled(ProgressBar)`
  background: #d793ff;
`;
