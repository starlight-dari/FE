"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Header from "../../components/header";
import axios from "axios";
import StarPage from "../../components/starModal";
import Image from "next/image";

interface MemoryStar {
  memory_id: number;
  img_url: string;
}

const MemoryPage = () => {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

  const [memoryStars, setMemoryStars] = useState<MemoryStar[]>([]);
  const [selectedMemoryId, setSelectedMemoryId] = useState<number | null>(null);

  const router = useRouter();

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
      } catch (error) {
        console.error("추억저장소 데이터 요청 중 오류 발생:", error);
      }
    };
    getStarArchiveData();
  }, []);

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
            {memoryStars?.map((item, index) => (
              <>
                <Star
                  key={index}
                  onClick={() => openStarInfoModal(item.memory_id)}
                >
                  <StarImage src={item.img_url} alt="memory star" />
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
  height: calc(100vh - 82px);
  color: #fff;
  padding: 10px;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 15px 0 25px 50px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
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
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);
  height: 100%;
  width: 1350px;
  position: relative;
`;

const MemoryStarList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Star = styled.div`
  display: flex;
  jusify-content: center;
  align-items: center;
  width: 450px;
  height: 450px;
`;

const StarImage = styled(Image)`
  width: 450px;
  height: 450px;
`;

const NoMemoryStar = styled.div`
  display: flex;
  height: 300px;
  align-items: center;
  justify-content: center;
`;
