"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface PetAlbumContentProps {
  petId: number | null;
  letterId: number;
}

export interface LetterDetail {
  letter_id: number;
  pet_id: number;
  title: string;
  content: string;
  createdAt: string;
  opened: boolean;
  images: string[];
}

const LetterDetail: React.FC<PetAlbumContentProps> = ({ petId, letterId }) => {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  const [letterDetail, setLetterDetail] = useState<LetterDetail | null>(null);

  useEffect(() => {
    if (!petId) return;

    const fetchPetAlbumLetterDetail = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `http://${server_url}:8080/memory-album/letter/${letterId}`,
          withCredentials: true,
        });

        console.log("서버 응답:", response);
        setLetterDetail(response.data);
      } catch (error) {
        console.error("반려동물 앨범 내용 가져오기 중 오류 발생:", error);
      }
    };

    fetchPetAlbumLetterDetail();
  }, [petId, letterId]);

  if (!letterDetail) return null;

  return (
    <>
      <Container>
        <Image src={letterDetail.images[0]} alt="" />
        <Wrapper>
          <div style={{ display: "flex" }}>
            <Title>{letterDetail.title}</Title>
            <Date>{letterDetail.createdAt}</Date>
          </div>
          <Content>{letterDetail.content}</Content>
        </Wrapper>
      </Container>
      <Button>목록</Button>
    </>
  );
};

export default LetterDetail;

const Container = styled.div`
  color: #fff;
  display: flex;
  padding: 50px 30px;
  width: 1200px;
  height: calc(-200px + 100vh);
`;

const Letter = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 25px;
`;

const Date = styled.div`
  font-size: 20px;
`;

const Content = styled.div`
  width: 550px;
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
  bottom: 50px;
  right: 70px;
`;
