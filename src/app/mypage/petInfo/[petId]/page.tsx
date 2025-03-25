"use client";

// import "../globals.css";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Header from "../../../../components/header";
import Image from "next/image";
import axios from "axios";
import { useParams } from "next/navigation";
import EditingAnimalInfo from "../../../../components/editingAnimalInfo";

export interface PetInfoData {
  pet_id: number;
  pet_img: string;
  pet_name: string;
  species: string;
  gender: string;
  birth_date: string;
  death_date: string;
  personality: string;
  member_id: number;
}

const GenderMap: Record<string, string> = {
  MALE: "남자",
  FEMALE: "여자",
  NONE: "모르겠어요",
};

const PersonalityMap: Record<string, string> = {
  CHARMING: "애교가 많아요",
  INDEPENDENT: "혼자서도 잘 놀아요",
  CURIOUS: "호기심이 많아요",
  CALM: "얌전해요",
  STUBBORN: "자기주장이 강해요",
  SENSITIVE: "감수성이 풍부해요",
};

export default function Page() {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

  const params = useParams();
  const petId = Number(params.petId);

  const [petDatas, setPetDatas] = useState<PetInfoData[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const getUsersPetInfo = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://${server_url}:8080/pets`,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      console.log("서버 응답:", response);

      setPetDatas(response.data);
      setLoading(false);
    } catch (error) {
      console.error("반려동물 정보 요청 중 오류 발생:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsersPetInfo();
  }, [isEditing]);

  // 수정 버튼 클릭 시
  const handleEdit = () => {
    setIsEditing(true);
  };

  if (loading) {
    return (
      <>
        <Header />
        <Body>
          <p>반려동물 정보를 받아오고 있어요...</p>
        </Body>
      </>
    );
  }

  if (!petDatas) {
    return (
      <>
        <Header />
        <Body>
          <p>반려동물 정보가 존재하지 않습니다.</p>
        </Body>
      </>
    );
  }

  const selectedPet = petDatas.find((pet) => pet.pet_id === petId);

  return (
    <>
      <Header />
      <Body>
        {selectedPet ? (
          <>
            <Title>동물 정보</Title>
            <ImageContainer>
              <Image src={selectedPet.pet_img} alt="pet image" />
            </ImageContainer>
            {isEditing ? (
              <EditingAnimalInfo
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                pet_id={selectedPet.pet_id}
                pet_name={selectedPet.pet_name}
                species={selectedPet.species}
                gender={selectedPet.gender}
                birth_date={selectedPet.birth_date}
                death_date={selectedPet.death_date}
                personality={selectedPet.personality}
              />
            ) : (
              <>
                <FormContainer>
                  <Label>이름</Label>
                  <Label>{selectedPet.pet_name}</Label>
                  <Label>종</Label>
                  <Label>{selectedPet.species}</Label>
                  <Label>성별</Label>
                  <Label>{GenderMap[selectedPet.gender]}</Label>
                  <Label>태어난 날</Label>
                  <Label>{selectedPet.birth_date}</Label>
                  <Label>별이 된 날</Label>
                  <Label>{selectedPet.death_date}</Label>
                  <Label>성격</Label>
                  <Label>{PersonalityMap[selectedPet.personality]}</Label>
                </FormContainer>
                <Button onClick={handleEdit}>수정하기</Button>
              </>
            )}
          </>
        ) : (
          <p>해당 반려동물을 찾을 수 없습니다.</p>
        )}
      </Body>
    </>
  );
}

const Body = styled.div`
  display: flex;
  padding: 30px;
  color: white;
  position: relative;
  align-items: center;
  background: linear-gradient(to bottom, #d9d9d91a 0%, #7373731a 100%);
  border-radius: 10px;
  gap: 150px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 512px;
  height: 512px;
  background-color: #ece6f0;
  position: relative;
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

// const ItemWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
//   justify-content: center;
// `;

// const Item = styled.div`
//   display: flex;
//   align-items: center;
// `;

const Title = styled.span`
  font-weight: 900;
  font-size: 20px;
  margin-bottom: 30px;
`;

const Button = styled.button`
  width: 146px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background: rgba(170, 200, 255, 0.15);
  color: #adc3f3;
  cursor: pointer;
  position: absolute;
  bottom: 25px;
  right: 70px;
`;
