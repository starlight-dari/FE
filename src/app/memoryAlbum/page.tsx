"use client";

import styled from "styled-components";
import React from "react";

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
  return (
    <>
      <Container>
        <h1>반려동물을 선택하여 반려동물로부터 도착한 편지를 확인해보세요.</h1>
      </Container>
    </>
  );
};

export default Page;

const Container = styled.div`
  display: flex;
  height: calc(-105px + 100vh);
  align-items: center;
  justify-content: center;
  color: #fff;
`;
