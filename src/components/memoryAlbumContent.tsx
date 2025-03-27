"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useAlbum } from "../context/AlbumContext";

interface PetAlbumContentProps {
  petId: number | null;
}

const AlbumContent: React.FC<PetAlbumContentProps> = ({ petId }) => {
  const router = useRouter();
  const { petAlbumContent, selectedPet, fetchPetList } = useAlbum();

  useEffect(() => {
    if (petId) {
      fetchPetList(petId);
    }
  }, [petId]);

  const handleLetterClick = (letterId: number) => {
    router.push(`/memoryAlbum/${petId}/${letterId}`);
  };

  if (!petId) return <h1>반려동물을 선택해주세요.</h1>;

  if (selectedPet && !selectedPet.albumStarted) {
    return (
      <NoLetter>
        <p>
          추억앨범을 이용하기 위해서는 별자리에 적어도 반려동물의 사진 5장이
          필요해요.
        </p>
        <p>반려동물의 별자리에 추억별을 추가해주세요.</p>
      </NoLetter>
    );
  }

  if (!petAlbumContent) return null;

  return (
    <>
      <Container>
        <Title>도착한 편지들</Title>
        {petAlbumContent && petAlbumContent.length > 0 ? (
          <LetterWrapper>
            {petAlbumContent?.map((item, index) => (
              <Letter
                key={index}
                onClick={() => handleLetterClick(item.letter_id)}
              >
                <LetterTitle>{item.title}</LetterTitle>
                <LetterContent>{item.content}</LetterContent>
                {!item.opened && <AlertBadge />}
              </Letter>
            ))}
          </LetterWrapper>
        ) : (
          <NoLetter>
            <p>아직 도착한 편지가 없어요. 조금만 기다려주세요.</p>
          </NoLetter>
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
  padding: 50px 0;
  gap: 6px;
  width: 1200px;
  height: calc(-200px + 100vh);
  overflow-y: auto;
`;

const Title = styled.div`
  font-size: 25px;
  padding-bottom: 20px;
`;

const LetterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: 400;
  height: 650px
  overflow-y: auto;
`;

const Letter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-weight: 400;
  background: linear-gradient(to bottom, #d9d9d91a 0%, #7373731a 100%);
  border-radius: 10px;
  padding: 30px;
  width: 1140px;
  position: relative;
  cursor: pointer;
`;

const LetterTitle = styled.div`
  font-size: 22px;
  width: 700px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const LetterContent = styled.div`
  font-size: 18px;
  width: 700px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const AlertBadge = styled.span`
  background: #f1683d;
  position: absolute;
  right: 38px;
  top: calc(50% - 10px);
  width: 20px;
  height: 20px;
  border-radius: 100px;
`;

const NoLetter = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 110px;
  height: calc(-105px + 100vh);
  width: 1205px;
`;
