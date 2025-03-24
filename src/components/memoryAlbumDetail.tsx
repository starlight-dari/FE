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
  const router = useRouter();

  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  const [letterDetail, setLetterDetail] = useState<LetterDetail | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const totalImages = letterDetail.images.length;

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };
  const handleLetterClick = () => {
    router.push(`/memoryAlbum/${petId}`);
  };

  return (
    <Body>
      <Button onClick={() => handleLetterClick()}>목록</Button>
      <Container>
        <CarouselWrapper>
          <ArrowButton onClick={prevImage}>{"<"}</ArrowButton>
          <Image
            src={letterDetail.images[currentIndex]}
            alt=""
            width={200}
            height={200}
          />
          <ArrowButton onClick={nextImage}>{">"}</ArrowButton>
        </CarouselWrapper>
        <Wrapper>
          <LetterHeader>
            <Title>{letterDetail.title}</Title>
            <Date>{letterDetail.createdAt}</Date>
          </LetterHeader>
          <Content>{letterDetail.content}</Content>
        </Wrapper>
      </Container>
    </Body>
  );
};

export default LetterDetail;

const Body = styled.div`
  display: flex;
  height: calc(-105px + 100vh);
  align-items: center;
  justify-content: center;
  width: 1425px;
`;

const Container = styled.div`
  color: #fff;
  display: flex;
  padding: 50px 30px;
  width: 1100px;
  height: calc(-200px + 100vh);
  height: 630px;
  background: linear-gradient(to bottom, #d9d9d91a 0%, #7373731a 100%);
  border-radius: 10px;
`;

const CarouselWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
`;

const LetterHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
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
