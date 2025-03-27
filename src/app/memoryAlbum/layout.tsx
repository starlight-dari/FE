"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import AlbumList from "../../components/memoryAlbumList";

export default function MemoryAlbumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);

  const handlePetAlbum = (petId: number) => {
    setSelectedPetId(petId);
    router.push(`/memoryAlbum/${petId}`);
  };

  return (
    <>
      <Header />
      <Body>
        <AlbumList onSelectPet={handlePetAlbum} />
        <Content>{children}</Content>
      </Body>
    </>
  );
}

const Body = styled.div`
  display: flex;
  height: calc(-105px + 100vh);
  justify-content: center;
  position: absolute;
  top: 100px;
  color: #fff;
`;

const Content = styled.div`
  width: calc(100vw - 300px);
  display: flex;
  justify-content: center;
`;
