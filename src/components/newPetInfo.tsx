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
}

const NewPetInfo: React.FC<NewPetInfoFormProps> = ({
  formData,
  setFormData,
  setImage,
  nextStep,
}) => {
  const [genderSelected, setGenderSelected] = useState("");

  const handleGenderSelect = (e: any) => {
    setGenderSelected(e.target.value);
    setFormData((prev: PetFormData) => ({
      ...prev,
      gender: e.target.value,
    }));
  };

  const [isOpen, setIsOpen] = useState(false);
  const [personalitySelected, setPersonalitySelected] = useState("성격");

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
    setIsOpen(false);

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
      formData.death_date?.trim() !== "" &&
      formData.personality?.trim() !== ""
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
        <ItemWrapper>
          <Title>새 별자리 만들기</Title>
          <Item>
            <Label style={{ paddingRight: "24px" }}>이름</Label>
            <Input
              placeholder="반려동물의 이름으로 별자리가 만들어질 거에요."
              value={formData.pet_name}
              onChange={(e) =>
                setFormData((prev: PetFormData) => ({
                  ...prev,
                  pet_name: e.target.value,
                }))
              }
            />
          </Item>
          <Item>
            <Label style={{ paddingRight: "38px" }}>종</Label>
            <Input
              placeholder="종을 적어주세요. (예: 강아지, 고양이)"
              value={formData.species}
              onChange={(e) =>
                setFormData((prev: PetFormData) => ({
                  ...prev,
                  species: e.target.value,
                }))
              }
            />
          </Item>
          <Item>
            <Label style={{ paddingRight: "24px" }}>성별</Label>
            <GenderButton>
              <input
                type="radio"
                id="MALE"
                name="gender"
                value="MALE"
                checked={genderSelected === "MALE"}
                onChange={(e) => {
                  handleGenderSelect(e);
                }}
              />
              <label
                htmlFor="MALE"
                className={genderSelected === "MALE" ? "selected" : ""}
              >
                남자
              </label>
              <input
                type="radio"
                id="FEMALE"
                name="gender"
                value="FEMALE"
                checked={genderSelected === "FEMALE"}
                onChange={(e) => {
                  handleGenderSelect(e);
                }}
              />
              <label
                htmlFor="FEMALE"
                className={genderSelected === "FEMALE" ? "selected" : ""}
              >
                여자
              </label>
              <input
                type="radio"
                id="NONE"
                name="gender"
                value="NONE"
                checked={genderSelected === "NONE"}
                onChange={(e) => {
                  handleGenderSelect(e);
                }}
              />
              <label
                htmlFor="NONE"
                className={genderSelected === "NONE" ? "selected" : ""}
              >
                모르겠어요
              </label>
            </GenderButton>
          </Item>
          <Item>
            <Label style={{ paddingRight: "30px" }}>태어난 날</Label>
            <DateInput
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
          </Item>
          <Item>
            <Label style={{ paddingRight: "26px" }}>별이 된 날</Label>
            <DateInput
              type="date"
              value={formData.death_date}
              max={today}
              onChange={(e) =>
                setFormData((prev: any) => ({
                  ...prev,
                  death_date: e.target.value,
                }))
              }
            />
          </Item>
          <Item>
            <Label style={{ paddingRight: "62px" }}>성격</Label>
            <SelectWrapper>
              <SelectedOption onClick={() => setIsOpen(!isOpen)}>
                {personalitySelected}
              </SelectedOption>
              <OptionsList isOpen={isOpen}>
                <OptionItem
                  onClick={() => handlePersonalitySelect("애교가 많아요")}
                >
                  애교가 많아요
                </OptionItem>
                <OptionItem
                  onClick={() => handlePersonalitySelect("혼자서도 잘 놀아요")}
                >
                  혼자서도 잘 놀아요
                </OptionItem>
                <OptionItem
                  onClick={() => handlePersonalitySelect("호기심이 많아요")}
                >
                  호기심이 많아요
                </OptionItem>
                <OptionItem onClick={() => handlePersonalitySelect("얌전해요")}>
                  얌전해요
                </OptionItem>
                <OptionItem
                  onClick={() => handlePersonalitySelect("자기주장이 강해요")}
                >
                  자기주장이 강해요
                </OptionItem>
                <OptionItem
                  onClick={() => handlePersonalitySelect("감수성이 풍부해요")}
                >
                  감수성이 풍부해요
                </OptionItem>
              </OptionsList>
            </SelectWrapper>
          </Item>
        </ItemWrapper>
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
  padding: 30px;
  color: white;
  position: relative;
  align-items: center;
  gap: 150px;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  font-weight: 900;
  font-size: 20px;
  margin-bottom: 30px;
`;

const Label = styled.span``;

const GenderButton = styled.span`
  input[type="radio"] {
    display: none;
  }

  // input[type="radio"]:checked + label {
  //   background-color: #22225e;
  //   color: #fff;
  // }

  label {
    display: inline-block;
    padding: 10px 20px;
    border: 1px solid gray;
    cursor: pointer;

    &:hover {
      background-color: #ece6f0;
      color: black;
    }

    &.selected {
      background-color: #22225e;
      color: #fff;
    }
  }
`;

const Input = styled.input`
  width: 350px;
  padding: 10px;
  border: 1px solid gray;
  outline: none;
`;

const DateInput = styled.input`
  padding: 10px;
  border: 1px solid gray;
  cursor: pointer;
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 190px;
`;

const SelectedOption = styled.div`
  padding: 10px;
  border: 1px solid gray;
  background-color: #fff;
  color: black;
  cursor: pointer;
`;

const OptionsList = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 190px;
  border: 1px solid gray;
  background-color: #fff;
  color: black;
  list-style: none;
  padding: 0;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  height: 100px;
  overflow-y: auto;
`;

const OptionItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ece6f0;
  }
`;

const Button = styled.button<{ disabled: boolean }>`
  width: 146px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background: ${({ disabled }) => (disabled ? "#d9d9d98c" : "#22225e")};
  color: #fff;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  position: absolute;
  bottom: 25px;
  right: 70px;
`;

export default NewPetInfo;
