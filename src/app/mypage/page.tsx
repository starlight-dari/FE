"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Header from "../../components/header";
import Image from "next/image";

import UserInfo from "../../components/userInfo";
import MyStar from "../../components/myStar";
import MemoryStarCollection from "../../components/memoryStarCollection";

const MenuBar = ({
  onMenuClick,
  selectedContent,
}: {
  onMenuClick: (menuId: number) => void;
  selectedContent: number;
}) => {
  return (
    <MenuList>
      <Menu isSelected={selectedContent === 1} onClick={() => onMenuClick(1)}>
        나의 별자리
      </Menu>
      <Menu isSelected={selectedContent === 2} onClick={() => onMenuClick(2)}>
        추억별 모아보기
      </Menu>
      <Menu isSelected={selectedContent === 3} onClick={() => onMenuClick(3)}>
        나의 후기 모음
      </Menu>
    </MenuList>
  );
};

export default function Page() {
  const [selectedContent, setSelectedContent] = useState(1);

  const handleMenuClick = (menuId: number) => {
    setSelectedContent(menuId);
  };

  return (
    <>
      <Header />
      <Body>
        <MenuBar
          selectedContent={selectedContent}
          onMenuClick={handleMenuClick}
        />
        <Container>
          <UserInfo />
          <MenuContent>
            {selectedContent === 1 && <MyStar />}
            {selectedContent === 2 && <MemoryStarCollection />}
            {selectedContent === 3 && <div>Content 3</div>}
          </MenuContent>
        </Container>
      </Body>
    </>
  );
}

const Body = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  position: absolute;
  top: 67px;
  color: #fff;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: calc(100vh - 65px);
  padding: 20px 0 0 20px;
  gap: 25px;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 4px 4px 10px rgba(255, 255, 255, 0.3);
`;

const Menu = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  font-size: 27px;
  font-weight: 900;
  cursor: pointer;
  color: ${({ isSelected }) => (isSelected ? "#fff06b" : "#fff")};

  &:hover {
    color: #fff06b;
    transform: scale(1.05);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const MenuContent = styled.div`
  display: flex;
  width: calc(-360px + 100vw);
  height: calc(100vh - 175px);
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  position: relative;
`;
