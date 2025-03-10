"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";

import edit from "/public/edit.svg";
import axios from "axios";

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
  const [petDatas, setPetDatas] = useState<PetData[] | null>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsersPetInfo = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `http://3.37.55.176:8080/pets`,
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

  return (
    <Container>
      <Title>나의 별자리</Title>
      <PetList>
        {petDatas?.map((item, index) => (
          <Pet key={index}>
            <PetImage src={item.pet_img} alt="pet photo" />
            <PetName>{item.pet_name}자리</PetName>
            <ul>
              <List>{item.pet_name}자리 보러가기</List>
              <List>반려동물 정보 수정하기</List>
            </ul>
          </Pet>
        ))}
      </PetList>
      <Button>별자리 추가하기</Button>
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

const Title = styled.div`
  font-size: 25px;
  font-weight: 900;
  padding-bottom: 10px;
`;

const PetList = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  border: 1px solid red;
  overflow-y: auto;
`;

const Pet = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 5px;
  border: 1px solid green;
`;

const PetImage = styled(Image)`
  width: 127px;
  height: 127px;
  border-radius: 100px;
`;

const PetName = styled.div`
  font-size: 20px;
  font-weight: 900;
  padding-right: 500px;
`;

const List = styled.li`
  list-style-type: circle;
`;

const Button = styled.button`
  border: none;
  background: #22225e;
  cursor: pointer;
  padding: 10px 500px;
  color: #fff;
  border-radius: 5px;
  position: absolute;
  bottom: 20px;
`;

export default MyStar;
