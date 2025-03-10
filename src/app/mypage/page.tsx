"use client";

import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Header from "../../components/header";
import Image from "next/image";

import UserInfo from "../../components/userInfo";
import MyStar from "../../components/myStar";

export default function Page() {
  const router = useRouter();

  return (
    <>
      <Header />
      <Body>
        <MenuBar>
          <Menu>나의 별자리</Menu>
          <Menu>추억별 모아보기</Menu>
          <Menu>나의 후기 모음</Menu>
        </MenuBar>
        <Container>
          <UserInfo />
          <MyStar />
        </Container>
      </Body>
    </>
  );
}

const Body = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  border-top: 1px solid #fff;
  position: absolute;
  top: 65px;
  color: #fff;
`;

const MenuBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: calc(100vh - 65px);
  top: 65px;
  padding: 20px 0 0 20px;
  gap: 25px;
  border-right: 1px solid #fff;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  font-size: 27px;
  font-weight: 900;
`;

const Container = styled.div``;
