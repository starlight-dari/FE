"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AlbumData } from "../app/memoryAlbum/page";

interface PetAlbumContentProps {
  petId: number | null;
}

export interface PetAlbumContent {
  letter_id: number;
  pet_id: number;
  title: string;
  content: string;
  createdAt: string;
  opened: boolean;
}

const AlbumContent: React.FC<PetAlbumContentProps> = ({ petId }) => {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  const [selectedPet, setSelectedPet] = useState<AlbumData | null>(null);
  const [petAlbumContent, setPetAlbumContent] = useState<
    PetAlbumContent[] | null
  >(null);

  useEffect(() => {
    if (!petId) return;

    const fetchSelectedPet = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `http://${server_url}:8080/memory-album/status`,
          withCredentials: true,
        });

        const petInfo = response.data.find(
          (pet: AlbumData) => pet.petId === petId
        );
        setSelectedPet(petInfo);
      } catch (error) {
        console.error("반려동물 정보 가져오기 중 오류 발생:", error);
      }
    };

    const getPetAlbumContent = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `http://${server_url}:8080/memory-album/pet/${petId}`,
          withCredentials: true,
        });

        console.log("서버 응답:", response);
        setPetAlbumContent(response.data);
      } catch (error) {
        console.error("추억 앨범 요청 중 오류 발생:", error);
      }
    };
    fetchSelectedPet();
    getPetAlbumContent();
  }, [petId]);

  if (!petId) return <h1>반려동물을 선택해주세요.</h1>;

  if (selectedPet && !selectedPet.albumStarted) {
    return (
      <h1>
        추억앨범을 이용하기 위해서는 별자리에 적어도 반려동물의 사진 5장이
        필요해요.
      </h1>
    );
  }

  if (!petAlbumContent) return null;

  return (
    <>
      <Container>
        {petAlbumContent && petAlbumContent.length > 0 ? (
          petAlbumContent?.map((item, index) => (
            <Letter key={index} isOpened={item.opened}>
              <LetterTitle>{item.title}</LetterTitle>
              <LetterContent>{item.content}</LetterContent>
            </Letter>
          ))
        ) : (
          <p>아직 도착한 편지가 없어요. 조금만 기다려주세요.</p>
        )}
      </Container>
    </>
  );
};

export default AlbumContent;

const Container = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 40px 30px;
  gap: 25px;
  flex-grow: 1;
  height: calc(-185px + 100vh);
  width: calc(100vw - 400px);
`;

const Letter = styled.div<{ isOpened: boolean }>`
  font-weight: ${({ isOpened }) => (isOpened ? 400 : 900)};
`;

const LetterTitle = styled.div`
  font-size: 20px;
`;

const LetterContent = styled.div`
  font-size: 15px;
  width: 600px; // 임시 지정
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
