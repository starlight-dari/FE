"use client";

import React from "react";
import styled from "styled-components";
import Header from "../../../components/header";
import UserInfo from "../../../components/userInfo";
import MemoryStarCollection from "../../../components/memoryStarCollection";

export default function Page() {
  return (
    <>
      <Header />
      <Body>
        <UserInfo />
        <MemoryStarCollection />
      </Body>
    </>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 99vw;
  align-items: center;
  position: absolute;
  top: 90px;
  color: #fff;
  padding-top: 30px;
  gap: 65px;
  overflow-x: hidden;
`;
