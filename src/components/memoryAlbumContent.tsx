"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const [petAlbumContent, setPetAlbumContent] = useState<
    PetAlbumContent[] | null
  >(null);

  useEffect(() => {
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
    getPetAlbumContent();
  }, []);

  if (!petAlbumContent) return null;

  return (
    <>
      <Container>
        {petAlbumContent?.map((item, index) => (
          <Letter key={index}>
            <LetterTitle>{item.title}</LetterTitle>
            <LetterContent>{item.content}</LetterContent>
          </Letter>
        ))}
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

const Letter = styled.div``;
const LetterTitle = styled.div``;
const LetterContent = styled.div``;
