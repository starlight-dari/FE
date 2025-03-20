"use client";

import React from "react";
import styled from "styled-components";
import Header from "../../../components/header";
import UserInfo from "../../../components/userInfo";
import MyStar from "../../../components/myStar";

export default function Page() {
  return (
    <>
      <Header />
      <Body>
        <UserInfo />
        <MyStar />
      </Body>
    </>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
  position: absolute;
  top: 90px;
  color: #fff;
  padding-top: 30px;
  gap: 65px;
`;
