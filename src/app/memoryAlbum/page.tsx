"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import AlbumContent from "../../components/memoryAlbumContent";
import AlbumList from "../../components/memoryAlbumList";

export interface AlbumData {
  petId: number;
  petName: string;
  imgUrl: string;
  albumStarted: boolean;
  arrived: boolean;
  arrivedCount: number;
}

export interface PetAlbumContent {
  letter_id: number;
  pet_id: number;
  title: string;
  content: string;
  createdAt: string;
  opened: boolean;
}

const Page: React.FC = () => {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);

  const handlePetAlbum = (petId: number) => {
    setSelectedPetId(petId);
  };

  return (
    <>
      <Header />
      <Body>
        <AlbumList onSelectPet={handlePetAlbum} />
        {selectedPetId ? (
          <AlbumContent petId={selectedPetId} />
        ) : (
          <Container>
            <h1>
              왼쪽에서 반려동물을 선택해서 <br />
              반려동물로부터 도착한 편지를 확인해보세요.
            </h1>
          </Container>
        )}
      </Body>
    </>
  );
};

export default Page;

const Body = styled.div`
  display: flex;
  height: calc(-105px + 100vh);
  justify-content: center;
  position: absolute;
  top: 100px;
  color: #fff;
`;

const Container = styled.div`
  display: flex;
  height: calc(-105px + 100vh);
  align-items: center;
  justify-content: center;
  color: #fff;
`;
