"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import StarPage from "./starModal";

interface MemoryStar {
  memory_id: number;
  img_url: string;
}

const MemoryStarCollection = () => {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

  const [memoryStars, setMemoryStars] = useState<MemoryStar[]>([]);
  const [memoryNumber, setMemoryNumber] = useState<number>(0);
  const [selectedMemoryId, setSelectedMemoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const openStarInfoModal = (memoryId: number) => {
    setSelectedMemoryId(memoryId);
  };

  const closeStarInfoModal = () => {
    setSelectedMemoryId(null);
  };

  useEffect(() => {
    const getMemoryStarCollection = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `http://${server_url}:8080/memory-stars`,
          withCredentials: true,
        });

        console.log("서버 응답:", response);

        setMemoryStars(response.data.memoryStarSimpleRepDtoList);
        setMemoryNumber(response.data.memoryNumber);
        setLoading(false);
      } catch (error) {
        console.error("나의 추억별 정보 요청 중 오류 발생:", error);
        setLoading(false);
      }
    };

    getMemoryStarCollection();
  }, [server_url]);

  if (loading) {
    return <h1>로딩 중입니다...</h1>;
  }

  if (!memoryStars) {
    return <h1>나의 추억별 정보가 존재하지 않습니다.</h1>;
  }

  if (memoryStars.length === 0) {
    return (
      <Container>
        <Title>나의 추억별</Title>
        <NoMemoryStar>
          <h3>새 별자리를 만들고 별에 추억을 기록해보세요.</h3>
        </NoMemoryStar>
      </Container>
    );
  }

  return (
    <Container>
      <Title>나의 추억별</Title>
      <MemoryStarList>
        {memoryStars?.map((item, index) => (
          <>
            <Star key={index} onClick={() => openStarInfoModal(item.memory_id)}>
              <StarImage src={item.img_url} alt="memory star" />
              <StarTitle>별 제목</StarTitle>
              <StarWriter>별 작성자</StarWriter>
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
  );
};

const Container = styled.div`
  width: 990px;
  position: relative;
  gap: 30px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 900;
`;

const MemoryStarList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  height: 740px;
  overflow-y: auto;
`;

const Star = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 370px;
  background: #ecddd729;
  gap: 18px;
  border-radius: 10px;
  cursor: pointer;
`;

const StarImage = styled(Image)`
  width: 320px;
  height: 420px;
  border-radius: 10px;
`;

const StarTitle = styled.div`
  padding-left: 23px;
`;

const StarWriter = styled.div`
  padding-left: 23px;
  color: #79747e;
`;

const NoMemoryStar = styled.div`
  display: flex;
  height: 300px;
  align-items: center;
  justify-content: center;
`;

export default MemoryStarCollection;
