"use client";

// import "../globals.css";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PetInfoData } from "../app/mypage/petInfo/[petId]/page";

export interface EditingPetFormData {
  pet_id: number;
  pet_name: string;
  species: string;
  gender: string;
  birth_date: string;
  death_date: string;
  personality: string;
}

interface EditingAnimalInfoProps extends EditingPetFormData {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditingAnimalInfo: React.FC<EditingAnimalInfoProps> = ({
  pet_id,
  pet_name,
  species,
  gender,
  birth_date,
  death_date,
  personality,
  isEditing,
  setIsEditing,
}) => {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

  const [editedPet, setEditedPet] = useState({
    pet_name,
    species,
    gender,
    birth_date,
    death_date,
    personality,
  });

  const [genderSelected, setGenderSelected] = useState("");

  const handleGenderSelect = (e: any) => {
    setGenderSelected(e.target.value);
    setEditedPet((prev: any) => ({
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

    setEditedPet((prev: any) => ({
      ...prev,
      personality: PersonalityMap[option],
    }));
  };

  const today = new Date().toISOString().split("T")[0];

  // 저장 버튼 클릭 시
  const handleSave = async () => {
    try {
      const response = await axios({
        method: "PATCH",
        url: `http://${server_url}:8080/pets/${pet_id}`,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        data: editedPet,
      });

      console.log("서버 응답:", response);

      setEditedPet(response.data); // 수정된 정보 반영
      setIsEditing(false);
    } catch (error) {
      console.error("반려동물 정보 요청 중 오류 발생:", error);
      setIsEditing(false);
    }
  };

  return (
    <>
      <ItemWrapper>
        <Title>동물 정보 수정하기</Title>
        <Item>
          <Label style={{ paddingRight: "62px" }}>이름</Label>
          <Input
            placeholder="반려동물의 이름으로 별자리가 만들어질 거에요."
            value={editedPet.pet_name}
            onChange={(e) =>
              setEditedPet((prev: any) => ({
                ...prev,
                pet_name: e.target.value,
              }))
            }
          />
        </Item>
        <Item>
          <Label style={{ paddingRight: "75px" }}>종</Label>
          <Input
            placeholder="종을 적어주세요. (예: 강아지, 고양이)"
            value={editedPet.species}
            onChange={(e) =>
              setEditedPet((prev: any) => ({
                ...prev,
                species: e.target.value,
              }))
            }
          />
        </Item>
        <Item>
          <Label style={{ paddingRight: "62px" }}>성별</Label>
          <GenderButton>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={genderSelected === "male"}
              onChange={(e) => {
                handleGenderSelect(e);
              }}
            />
            <label
              htmlFor="male"
              className={genderSelected === "male" ? "selected" : ""}
            >
              남자
            </label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={genderSelected === "female"}
              onChange={(e) => {
                handleGenderSelect(e);
              }}
            />
            <label
              htmlFor="female"
              className={genderSelected === "female" ? "selected" : ""}
            >
              여자
            </label>
            <input
              type="radio"
              id="none"
              name="gender"
              value="none"
              checked={genderSelected === "none"}
              onChange={(e) => {
                handleGenderSelect(e);
              }}
            />
            <label
              htmlFor="none"
              className={genderSelected === "none" ? "selected" : ""}
            >
              모르겠어요
            </label>
          </GenderButton>
        </Item>
        <Item>
          <Label style={{ paddingRight: "30px" }}>태어난 날</Label>
          <DateInput
            type="date"
            value={editedPet.birth_date}
            max={today}
            onChange={(e) =>
              setEditedPet((prev: any) => ({
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
            value={editedPet.death_date}
            max={today}
            onChange={(e) =>
              setEditedPet((prev: any) => ({
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
      <Button onClick={handleSave}>수정하기</Button>
    </>
  );
};

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

export default EditingAnimalInfo;
