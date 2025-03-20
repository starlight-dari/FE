"use client";

import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Header from "../../components/header";

import MARU from "/public/maru.svg";
import KONG from "/public/kong.svg";
import JJONG from "/public/jjong.svg";

const Page: React.FC = () => {
  const albums = [
    { id: "1", name: "마루" },
    { id: "2", name: "콩이" },
    { id: "3", name: "쫑이" },
  ];

  {
    /* {albums.map((album) => (
            <li
              key={album.id}
              onClick={() => router.push(`/memoryAlbum/${album.id}`)}
            >
              {album.name}
            </li>
          ))} */
  }

  return (
    <>
      <Header />
      <Body>
        <AlbumList>
          <Title>추억앨범</Title>
          <List>
            <Image src={MARU} alt="" />
            마루
            <AlertBadge>2</AlertBadge>
          </List>
          <List>
            <Image src={KONG} alt="" />
            콩이
          </List>
          <List>
            <Image src={JJONG} alt="" />
            쫑이
          </List>
        </AlbumList>

        <Container>
          <Letter>
            <LetterTitle>(편지 제목)</LetterTitle>
            <LetterContent>
              (편지내용 미리보기)(편지내용 미리보기)(편지내용 미리보기)(편지내용
              미리보기)(편지내용 미리보기)(편지내용 미리보기)(편지내용
              미리보기)(편지내용 미리보기)(편지내용 미리보기)(편지내용 미리보기)
            </LetterContent>
          </Letter>
          <Letter>
            <LetterTitle>(편지 제목)</LetterTitle>
            <LetterContent>
              (편지내용 미리보기)(편지내용 미리보기)(편지내용 미리보기)(편지내용
              미리보기)(편지내용 미리보기)(편지내용 미리보기)(편지내용
              미리보기)(편지내용 미리보기)(편지내용 미리보기)(편지내용 미리보기)
            </LetterContent>
          </Letter>
          <Letter>
            <LetterTitle>(편지 제목)</LetterTitle>
            <LetterContent>
              (편지내용 미리보기)(편지내용 미리보기)(편지내용 미리보기)(편지내용
              미리보기)(편지내용 미리보기)(편지내용 미리보기)(편지내용
              미리보기)(편지내용 미리보기)(편지내용 미리보기)(편지내용 미리보기)
            </LetterContent>
          </Letter>
          <Letter>
            <LetterTitle>(편지 제목)</LetterTitle>
            <LetterContent>
              (편지내용 미리보기)(편지내용 미리보기)(편지내용 미리보기)(편지내용
              미리보기)(편지내용 미리보기)(편지내용 미리보기)(편지내용
              미리보기)(편지내용 미리보기)(편지내용 미리보기)(편지내용 미리보기)
            </LetterContent>
          </Letter>
          <Letter>
            <LetterTitle>(편지 제목)</LetterTitle>
            <LetterContent>
              (편지내용 미리보기)(편지내용 미리보기)(편지내용 미리보기)(편지내용
              미리보기)(편지내용 미리보기)(편지내용 미리보기)(편지내용
              미리보기)(편지내용 미리보기)(편지내용 미리보기)(편지내용 미리보기)
            </LetterContent>
          </Letter>
        </Container>
      </Body>
    </>
  );
};

export default Page;

const Body = styled.div`
  display: flex;
  height: calc(100vh - 65px);
  justify-content: center;
  position: absolute;
  top: 65px;
`;

const Container = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 40px 30px;
  gap: 25px;
  flex-grow: 1;
  height: calc(100vh - 65px);
  width: calc(100vw - 400px);
`;

const AlbumList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: calc(100vh - 65px);
  position: sticky;
  top: 65px;
  padding: 10px 20px;
  color: #fff;
  gap: 10px;
  border-right: 1px solid #fff;
`;

const AlertBadge = styled.span`
  color: white;
  background: #ffcc00;
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
  font-size: 20px;
  margin-bottom: 30px;
`;

const List = styled.li`
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;
`;

const Letter = styled.div``;
const LetterTitle = styled.div``;
const LetterContent = styled.div``;
