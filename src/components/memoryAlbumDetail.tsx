"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import left from "/public/carousel_left.svg";
import right from "/public/carousel_right.svg";
import { useAlbum } from "../context/AlbumContext";

interface PetAlbumContentProps {
  petId: number | null;
  letterId: number;
}

const LetterDetail: React.FC<PetAlbumContentProps> = ({ petId, letterId }) => {
  const router = useRouter();
  const {
    petAlbumContent,
    selectedPet,
    fetchPetList,
    letterDetail,
    fetchLetterDetail,
  } = useAlbum();

  // petId가 변경될 때마다 데이터를 새로 가져오기
  useEffect(() => {
    if (petId) {
      fetchPetList(petId); // Context에서 데이터를 갱신
    }
  }, [petId, fetchPetList]);

  // letterId에 해당하는 편지 정보 찾기
  useEffect(() => {
    if (petAlbumContent && letterId) {
      const letter = petAlbumContent.find(
        (item) => item.letter_id === letterId
      );
      if (!letter) return;
      fetchLetterDetail(letter.letter_id);
    }
  }, [petAlbumContent, letterId]);

  const [currentIndex, setCurrentIndex] = useState(0);

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
      <Container>
        <Button onClick={() => handleLetterClick()}>목록</Button>
        {letterDetail.images.length > 0 && (
          <CarouselWrapper>
            <ArrowButton onClick={prevImage}>
              <Image src={left} alt="left" />
            </ArrowButton>
            <Image
              src={letterDetail.images[currentIndex]}
              alt=""
              width={400}
              height={400}
            />
            <ArrowButton onClick={nextImage}>
              <Image src={right} alt="right" />
            </ArrowButton>
          </CarouselWrapper>
        )}
        <Wrapper>
          <LetterHeader>
            <Title>{letterDetail.title}</Title>
            <Date>{letterDetail.createdAt}</Date>
          </LetterHeader>
          <Content>{letterDetail.content}</Content>
          {/* <TypingEffect text={letterDetail.content} speed={100} /> */}
        </Wrapper>
      </Container>
    </Body>
  );
};

export default LetterDetail;

const TypingEffect = ({
  text,
  speed = 100,
}: {
  text: string;
  speed: number;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0); // 현재 글자 위치를 useRef로 관리

  useEffect(() => {
    setDisplayedText(""); // 새로운 text가 들어오면 초기화
    indexRef.current = 0; // 인덱스 초기화

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayedText((prev) => prev + text[indexRef.current]);
        indexRef.current += 1;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <Content>{displayedText}</Content>;
};

const Body = styled.div`
  display: flex;
  height: calc(-105px + 100vh);
  align-items: center;
  justify-content: center;
  width: 1425px;
  flex-direction: column;
  position: relative;
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
  justify-content: center;
  align-items: center;
  gap: 50px;
  position: relative;
`;

const CarouselWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
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
  color: #d9d9d93d;
`;

const Content = styled.div`
  width: 550px;
  font-size: 22px;
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
  top: 50px;
  right: 30px;
`;
