"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/header";
import axios from "axios";
import StarPage from "../../components/starModal";
import Image from "next/image";

interface MemoryStar {
  memory_id: number;
  name: string;
  writer_name: string;
  img_url: string;
}

const MemoryPage = () => {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

  const [memoryStars, setMemoryStars] = useState<MemoryStar[]>([]);
  const [selectedMemoryId, setSelectedMemoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const openStarInfoModal = (memoryId: number) => {
    setSelectedMemoryId(memoryId);
  };

  const closeStarInfoModal = () => {
    setSelectedMemoryId(null);
  };

  useEffect(() => {
    const getStarArchiveData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `http://${server_url}:8080/memory-stars/public`,
          //   withCredentials: true,
        });

        console.log("서버 응답:", response);
        setMemoryStars(response.data);
        setLoading(false);
      } catch (error) {
        console.error("추억저장소 데이터 요청 중 오류 발생:", error);
        setLoading(false);
      }
    };
    getStarArchiveData();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <Body>
          <TitleWrapper>
            <Title>별빛 저장소</Title>
            <Subtitle>다른 별빛들의 추억들을 둘러보세요.</Subtitle>
          </TitleWrapper>
          <Container>
            <MemoryStarList>
              <SkeletonUI />
              <SkeletonUI />
              <SkeletonUI />
              <SkeletonUI />
              <SkeletonUI />
              <SkeletonUI />
              <SkeletonUI />
              <SkeletonUI />
              <SkeletonUI />
              <SkeletonUI />
              <SkeletonUI />
              <SkeletonUI />
            </MemoryStarList>
          </Container>
        </Body>
      </>
    );
  }

  return (
    <>
      <Header />
      <Body>
        <TitleWrapper>
          <Title>별빛 저장소</Title>
          <Subtitle>다른 별빛들의 추억들을 둘러보세요.</Subtitle>
        </TitleWrapper>
        <Container>
          {memoryStars.length == 0 ? (
            <p style={{ position: "absolute", left: "41%", top: "50%" }}>
              아직 공개된 추억들이 없어요.
            </p>
          ) : (
            <MemoryStarList>
              {memoryStars?.map((item, index) => (
                <>
                  <Star
                    key={index}
                    onClick={() => openStarInfoModal(item.memory_id)}
                  >
                    <StarImage
                      src={item.img_url}
                      width={450}
                      height={450}
                      alt="memory star"
                    />
                    <StarTitle>{item.name}</StarTitle>
                    <StarWriter>{item.writer_name}</StarWriter>
                  </Star>
                  {selectedMemoryId === item.memory_id && (
                    <StarPage
                      key={index}
                      memoryId={item.memory_id}
                      onClose={closeStarInfoModal}
                    />
                  )}
                </>
              ))}
            </MemoryStarList>
          )}
        </Container>
      </Body>
    </>
  );
};

export default MemoryPage;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: calc(100vh - 90px);
  color: #fff;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 1190px;
  padding: 30px 0;
  align-items: end;
  gap: 15px;
`;

const Title = styled.div`
  font-weight: 900;
  font-size: 30px;
`;

const Subtitle = styled.div`
  font-size: 23px;
`;

const Container = styled.div`
  height: 926px;
  width: 1190px;
  position: relative;
  overflow-y: auto;
`;

const MemoryStarList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 37px;
  margin-bottom: 10px;
`;

const Star = styled.div`
  display: flex;
  flex-direction: column;
  width: 265px;
  height: 360px;
  background: #ecddd729;
  gap: 18px;
  border-radius: 10px;
  cursor: pointer;
`;

const StarImage = styled(Image)`
  width: 265px;
  height: 265px;
  border-radius: 10px;
`;

const StarTitle = styled.div`
  padding-left: 23px;
  width: 220px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StarWriter = styled.div`
  padding-left: 23px;
  color: #79747e;
  width: 220px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const NoMemoryStar = styled.div`
  display: flex;
  height: 300px;
  align-items: center;
  justify-content: center;
`;

const SkeletonUI = styled.div`
  width: 265px;
  height: 360px;
  border-radius: 18px;
  background: #d9d9d929;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  animation: pulse 1.7s infinite ease-in-out;
  @keyframes pulse {
    0% {
      background: rgba(200, 200, 200, 0.9);
    }
    50% {
      background: rgba(200, 200, 200, 0.5);
    }
    100% {
      background: rgba(200, 200, 200, 0.9);
    }
  }
`;
