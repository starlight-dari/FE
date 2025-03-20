"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

interface PetData {
  member_id: number;
  pet_id: number;
  pet_img: string;
  pet_name: string;
  species: string;
  gender: string;
  birth_date: string;
  death_date: string;
  personality: string;
}

const MyStar = () => {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

  const router = useRouter();

  const [petDatas, setPetDatas] = useState<PetData[] | null>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsersPetInfo = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `http://${server_url}:8080/pets`,
          withCredentials: true,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        });

        console.log("서버 응답:", response);

        setPetDatas(response.data);
        setLoading(false);
      } catch (error) {
        console.error("반려동물 정보 요청 중 오류 발생:", error);
        setLoading(false);
      }
    };

    getUsersPetInfo();
  }, []);

  if (loading) {
    return <h1>로딩 중입니다...</h1>;
  }

  if (!petDatas) {
    return <h1>반려동물 정보가 존재하지 않습니다.</h1>;
  }

  if (petDatas.length == 0) {
    return (
      <Container>
        <Title>나의 별자리</Title>
        <NoPet>
          <h3>새 별자리를 만들고 다른 사람들과 별빛을 나눠보세요.</h3>
        </NoPet>
        <Button onClick={() => router.push("/add_new_animal")}>
          별자리 추가하기
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Title>나의 별자리</Title>
      <PetList>
        {petDatas?.map((item, index) => (
          <Pet key={index}>
            <PetImage src={item.pet_img} alt="pet photo" />
            <PetName>{item.pet_name}자리</PetName>
            <ButtonWrapper>
              <PetButton onClick={() => router.push(`/main/${item.pet_id}`)}>
                별자리로 이동
              </PetButton>
              <PetButton
                onClick={() => router.push(`/mypage/petInfo/${item.pet_id}`)}
              >
                동물 정보 보기
              </PetButton>
            </ButtonWrapper>
          </Pet>
        ))}
      </PetList>
      <Button onClick={() => router.push("/add_new_animal")}>
        별자리 추가하기
      </Button>
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

const PetList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  height: 740px;
  overflow-y: auto;
`;

const Pet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  padding: 20px;
  border-radius: 18px;
  background: #d9d9d929;
  width: 280px;
  height: 390px;
`;

const PetImage = styled(Image)`
  width: 260px;
  height: 260px;
`;

const PetName = styled.div`
  font-size: 20px;
  font-weight: 900;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 27px;
`;

const PetButton = styled.button`
  width: 120px;
  height: 56px;
  border: none;
  background: #101827;
  cursor: pointer;
  color: #fff;
  border-radius: 16px;
`;

const Button = styled.button`
  border: none;
  background: #22225e;
  cursor: pointer;
  padding: 10px 50px;
  color: #fff;
  border-radius: 13px;
  position: absolute;
  top: 0;
  right: 10px;
`;

const NoPet = styled.div`
  display: flex;
  height: 300px;
  align-items: center;
  justify-content: center;
`;

export default MyStar;
