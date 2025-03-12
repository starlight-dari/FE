"use client";

// import "../globals.css";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Header from "../../../../components/header";
import Image from "next/image";
import axios from "axios";
import { useParams } from "next/navigation";

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

export default function Page() {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

  const params = useParams();
  const petId = Number(params.petId);

  const [petDatas, setPetDatas] = useState<PetInfoData[] | null>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    getUsersPetInfo();
  }, []);

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
            <ImageContainer>
              <Image src={selectedPet.pet_img} alt="pet image" />
            </ImageContainer>
            <ItemWrapper>
              <Title>동물 정보</Title>
              <Item>
                <Label style={{ paddingRight: "24px" }}>이름</Label>
                <Label>{selectedPet.pet_name}</Label>
              </Item>
              <Item>
                <Label style={{ paddingRight: "38px" }}>종</Label>
                <Label>{selectedPet.species}</Label>
              </Item>
              <Item>
                <Label style={{ paddingRight: "24px" }}>성별</Label>
                <Label>{selectedPet.gender}</Label>
              </Item>
              <Item>
                <Label style={{ paddingRight: "30px" }}>태어난 날</Label>
                <Label>{selectedPet.birth_date}</Label>
              </Item>
              <Item>
                <Label style={{ paddingRight: "26px" }}>별이 된 날</Label>
                <Label>{selectedPet.death_date}</Label>
              </Item>
              <Item>
                <Label style={{ paddingRight: "62px" }}>성격</Label>
                <Label>{selectedPet.personality}</Label>
              </Item>
            </ItemWrapper>
            <Button>수정하기</Button>
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
  gap: 150px;
`;

const ImageContainer = styled.div`
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
