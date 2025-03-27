"use client";

import Image from "next/image";
import styled from "styled-components";
import React, { useEffect } from "react";
import { useAlbum } from "../context/AlbumContext";

interface AlbumListProps {
  onSelectPet: (petId: number) => void;
}

const AlbumList: React.FC<AlbumListProps> = ({ onSelectPet }) => {
  const { albumData, fetchPetList, selectedPet } = useAlbum();

  useEffect(() => {
    console.log("memoryAlbumList 컴포넌트 초기 앨범 데이터 가져오는 중...");
    fetchPetList(null);
  }, []);

  if (!albumData) return null;

  return (
    <>
      <PetList>
        <Title>추억앨범</Title>
        {albumData?.map((item, index) => (
          <List
            key={index}
            onClick={() => onSelectPet(item.petId)}
            selected={selectedPet?.petId === item.petId}
          >
            <PetImage
              width={40}
              height={40}
              src={item.imgUrl}
              alt="pet photo"
            />
            {item.petName}
            {item.arrived && <AlertBadge>{item.arrivedCount}</AlertBadge>}
          </List>
        ))}
      </PetList>
    </>
  );
};

export default AlbumList;

const PetList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: calc(-126px + 100vh);
  padding: 10px 0;
  color: #fff;
  gap: 10px;
`;

const AlertBadge = styled.span`
  color: white;
  background: #f1683d;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 17px;
  width: 25px;
  height: 25px;
  border-radius: 100px;
  font-size: 12px;
`;

const Title = styled.div`
  font-weight: 900;
  font-size: 27px;
  margin-bottom: 20px;
  border-bottom: 1px solid #fff;
  padding-bottom: 10px;
  padding-left: 30px;
`;

const List = styled.li<{ selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  cursor: pointer;
  padding: 10px 0 10px 27px;
  background: ${({ selected }) =>
    selected
      ? "linear-gradient(to bottom, #d9d9d91a 0%, #7373731a 100%)"
      : "none"};
  border-radius: 5px;
`;

const PetImage = styled(Image)`
  border-radius: 100px;
`;
