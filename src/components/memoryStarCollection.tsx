"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

interface MemoryStar {
  memoryStarSimpleRepDtoList: {
    memory_id: number;
    img_url: string;
  }[];
  memoryNumber: number;
}

const MemoryStarCollection = () => {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

  const router = useRouter();

  const [memoryStars, setMemoryStars] = useState<MemoryStar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMemoryStarCollection = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `http://${server_url}:8080/memory-stars`,
          withCredentials: true,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        });

        console.log("서버 응답:", response);

        setMemoryStars(response.data);
        setLoading(false);
      } catch (error) {
        console.error("반려동물 정보 요청 중 오류 발생:", error);
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
        <NoMemoryStar>
          <h3>새 별자리를 만들고 별에 추억을 기록해보세요.</h3>
        </NoMemoryStar>
      </Container>
    );
  }

  return (
    <Container>
      {/* <MemoryStarList>
        {memoryStars?.memoryStarSimpleRepDtoList.map((item, index) => (
          <Star key={index} >
            <StarImage src={item.img_url} alt="memory star" />
          </Star>
        ))}
      </MemoryStarList> */}
      <MemoryStarList>
        {memoryStars.map((memoryStar, index) =>
          memoryStar.memoryStarSimpleRepDtoList.map((item) => (
            <Star key={item.memory_id}>
              <StarImage src={item.img_url} alt="memory star" />
            </Star>
          ))
        )}
      </MemoryStarList>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid #fff;
  padding: 20px;
  width: 1100px;
  height: 400px;
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

export default MemoryStarCollection;
