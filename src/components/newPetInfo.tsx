"use client";

// import "../globals.css";
import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";
import PetImageUpload from "./petImageUpload";
import { PetFormData } from "../app/add_new_animal/page";

interface NewPetInfoFormProps {
  formData: PetFormData;
  setFormData: React.Dispatch<React.SetStateAction<PetFormData>>;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  nextStep: () => void;
  isAlive: boolean;
}

const GENDER_OPTIONS = [
  { label: "여성", value: "FEMALE" },
  { label: "남성", value: "MALE" },
  { label: "모르겠어요", value: "NONE" },
];

const PERSONALITY_OPTIONS = [
  "애교가 많아요",
  "혼자서도 잘 놀아요",
  "호기심이 많아요",
  "얌전해요",
  "자기주장이 강해요",
  "감수성이 풍부해요",
];

const NewPetInfo: React.FC<NewPetInfoFormProps> = ({
  formData,
  setFormData,
  setImage,
  nextStep,
  isAlive,
}) => {
  const [genderSelected, setGenderSelected] = useState<string>("");

  const handleGenderSelect = (e: any) => {
    setGenderSelected(e.target.value);
    setFormData((prev: PetFormData) => ({
      ...prev,
      gender: e.target.value,
    }));
  };

  const [personalitySelected, setPersonalitySelected] =
    useState<string>("성격");

  const handlePersonalitySelect = (option: string) => {
    const PersonalityMap: Record<string, string> = {
      "애교가 많아요": "CHARMING",
      "혼자서도 잘 놀아요": "INDEPENDENT",
      "호기심이 많아요": "CURIOUS",
      얌전해요: "CALM",
      "자기주장이 강해요": "STUBBORN",
      "감수성이 풍부해요": "SENSITIVE",
    };

    setPersonalitySelected(option);

    setFormData((prev: PetFormData) => ({
      ...prev,
      personality: PersonalityMap[option],
    }));
  };

  const today = new Date().toISOString().split("T")[0];

  const isFormValid = useCallback((): boolean => {
    return (
      formData.pet_img !== null &&
      formData.pet_name?.trim() !== "" &&
      formData.species?.trim() !== "" &&
      formData.gender?.trim() !== "" &&
      formData.birth_date?.trim() !== "" &&
      (!isAlive ? formData.death_date?.trim() !== "" : true) &&
      !!formData.personality?.trim()
    );
  }, [formData]); // formData가 변경될 때마다 isFormValid 함수가 새로 생성됨

  useEffect(() => {
    console.log(formData);
  }, [formData, isFormValid]); // formData가 변경될 때마다 유효성 검사 실행

  return (
    <>
      <Body>
        <PetImageUpload
          formData={formData}
          setFormData={setFormData}
          setImage={setImage}
        />
        <FormContainer>
          <Label>이름</Label>
          <Input
            type="text"
            placeholder="반려동물의 이름으로 별자리가 만들어질 거에요."
            value={formData.pet_name}
            onChange={(e) =>
              setFormData((prev: PetFormData) => ({
                ...prev,
                pet_name: e.target.value,
              }))
            }
          />

          <Label>종</Label>
          <Input
            type="text"
            placeholder="종을 적어주세요. (예: 강아지, 고양이)"
            value={formData.species}
            onChange={(e) =>
              setFormData((prev: PetFormData) => ({
                ...prev,
                species: e.target.value,
              }))
            }
          />

          <Label>호칭</Label>
          <Input
            type="text"
            placeholder="반려동물에게 당신은 어떤 역할을 맡고 있나요? (예: 엄마)"
            value={formData.nickname}
            onChange={(e) =>
              setFormData((prev: PetFormData) => ({
                ...prev,
                nickname: e.target.value,
              }))
            }
          />

          <Label>성별</Label>
          <GenderOptions>
            {GENDER_OPTIONS.map(({ label, value }) => (
              <GenderButton
                key={value}
                isSelected={genderSelected === value}
                onChange={(e) => {
                  handleGenderSelect(e);
                }}
              >
                <input
                  type="radio"
                  name="gender"
                  value={value}
                  checked={genderSelected === value}
                  onChange={(e) => {
                    handleGenderSelect(e);
                  }}
                />
                {label}
              </GenderButton>
            ))}
          </GenderOptions>

          <Label>태어난 날</Label>
          <Input
            type="date"
            value={formData.birth_date}
            max={today}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                birth_date: e.target.value,
              }))
            }
          />

          <Label>별이 된 날</Label>
          <Input
            type="date"
            value={formData.death_date}
            max={today}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                death_date: e.target.value,
              }))
            }
            disabled={isAlive === true}
          />

          <Label>성격</Label>
          <Select
            value={personalitySelected}
            onChange={(e) => handlePersonalitySelect(e.target.value)}
          >
            <option>성격 선택</option>
            {PERSONALITY_OPTIONS.map((personality) => (
              <option key={personality} value={personality}>
                {personality}
              </option>
            ))}
          </Select>
        </FormContainer>
        <Button
          onClick={() => {
            nextStep();
            console.log(formData);
          }}
          disabled={!isFormValid()}
        >
          다음
        </Button>
      </Body>
    </>
  );
};

const Body = styled.div`
  display: flex;
  padding: 50px;
  color: #fff;
  position: relative;
  align-items: center;
  gap: 35px;
  background: linear-gradient(to bottom, #d9d9d91a 0%, #7373731a 100%);
  border-radius: 10px;
`;

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 12px;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 495px;
`;

const Label = styled.label`
  color: white;
  font-size: 14px;
`;

const GenderOptions = styled.div`
  display: flex;
  gap: 10px;
`;

const GenderButton = styled.label<{ isSelected: boolean }>`
  padding: 10px;
  background: ${({ isSelected }) => (isSelected ? "#4b5563" : "#374151")};
  color: ${({ isSelected }) => (isSelected ? "#ADC3F3" : "#fff")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s;
  text-align: center;
  width: 100px;

  &:hover {
    background: #4b5563;
  }

  input {
    display: none;
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #374151;
  border-radius: 5px;
  background: #1f2937;
  color: white;
  font-size: 14px;
  width: 100%;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #374151;
  border-radius: 5px;
  background: #1f2937;
  color: white;
  font-size: 14px;
  width: 100%;
`;

const Button = styled.button<{ disabled: boolean }>`
  width: 146px;
  height: 40px;
  border: ${({ disabled }) => (disabled ? "1px solid #767D8B" : "none")};
  border-radius: 5px;
  background: ${({ disabled }) =>
    disabled ? "transparent" : "rgba(170, 200, 255, 0.15)"};
  color: ${({ disabled }) => (disabled ? "#767D8B" : "#adc3f3")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  position: absolute;
  bottom: 25px;
  right: 70px;
`;

export default NewPetInfo;
