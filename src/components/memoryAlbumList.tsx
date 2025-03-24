"use client";

import Image from "next/image";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AlbumData } from "../app/memoryAlbum/page";

interface AlbumListProps {
  onSelectPet: (petId: number) => void;
}

const AlbumList: React.FC<AlbumListProps> = ({ onSelectPet }) => {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  const [albumData, setAlbumData] = useState<AlbumData[] | null>(null);

  useEffect(() => {
    const getAlbumDataInfo = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `http://${server_url}:8080/memory-album/status`,
          withCredentials: true,
        });

        console.log("서버 응답:", response);
        setAlbumData(response.data);
      } catch (error) {
        console.error("추억 앨범리스트 요청 중 오류 발생:", error);
      }
    };
    getAlbumDataInfo();
  }, []);

  if (!albumData) return null;

  return (
    <>
      <PetList>
        <Title>추억앨범</Title>
        {albumData?.map((item, index) => (
          <>
            <List key={index} onClick={() => onSelectPet(item.petId)}>
              <PetImage
                width={40}
                height={40}
                src={item.imgUrl}
                alt="pet photo"
              />
              {item.petName}
              {item.arrived && <AlertBadge>{item.arrivedCount}</AlertBadge>}
            </List>
          </>
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
  right: 0;
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

const List = styled.li`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  padding-left: 27px;
  cursor: pointer;
`;

const PetImage = styled(Image)`
  border-radius: 100px;
`;
