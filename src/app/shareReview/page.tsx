"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Header from "../../components/header";

const ShareReviewPage = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [categorySelected, setCategorySelected] = useState("전체");

  const handleCategorySelect = (option: string) => {
    setCategorySelected(option);
    setIsOpen(false);
  };

  return (
    <>
      <Header />
      <Body>
        <Top>
          <Title>후기 나눔</Title>
          <ItemBox>
            <Label>
              장례 서비스 후기, 펫로스 극복 프로그램 후기, 극복 사례 공유 등등
              여러분의 다양한 후기를 공유해주세요.
            </Label>
            <Item>
              <SelectWrapper>
                <SelectedOption onClick={() => setIsOpen(!isOpen)}>
                  {categorySelected}
                </SelectedOption>
                <OptionsList isOpen={isOpen}>
                  <OptionItem onClick={() => handleCategorySelect("전체")}>
                    전체
                  </OptionItem>
                  <OptionItem
                    onClick={() => handleCategorySelect("장례 서비스 후기")}
                  >
                    장례 서비스 후기
                  </OptionItem>
                  <OptionItem
                    onClick={() =>
                      handleCategorySelect("펫로스 극복 프로그램 후기")
                    }
                  >
                    펫로스 극복 프로그램 후기
                  </OptionItem>
                  <OptionItem
                    onClick={() => handleCategorySelect("극복 사례 공유")}
                  >
                    극복 사례 공유
                  </OptionItem>
                  <OptionItem onClick={() => handleCategorySelect("기타")}>
                    기타
                  </OptionItem>
                </OptionsList>
              </SelectWrapper>
            </Item>
          </ItemBox>
        </Top>
        <Container>
          <ContentWrapper>
            <ContentArea>
              <ContentTitle>글제목</ContentTitle>
              <p>글내용입니다글내용입니다</p>
            </ContentArea>
            <ContentArea>
              <ContentTitle>글제목</ContentTitle>
              <p>글내용입니다글내용입니다</p>
            </ContentArea>
            <ContentArea>
              <ContentTitle>글제목</ContentTitle>
              <p>글내용입니다글내용입니다</p>
            </ContentArea>
            <ContentArea>
              <ContentTitle>글제목</ContentTitle>
              <p>글내용입니다글내용입니다</p>
            </ContentArea>
            <ContentArea>
              <ContentTitle>글제목</ContentTitle>
              <p>글내용입니다글내용입니다</p>
            </ContentArea>
            <ContentArea>
              <ContentTitle>글제목</ContentTitle>
              <p>글내용입니다글내용입니다</p>
            </ContentArea>
          </ContentWrapper>
          {/* 페이지네이션 추가 필요 */}
          <ButtonWrapper>
            <Button>글쓰기</Button>
          </ButtonWrapper>
        </Container>
      </Body>
    </>
  );
};

export default ShareReviewPage;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  align-items: center;
`;

const Top = styled.div`
  width: 70vw;
  border-bottom: 1px solid #fff;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 10px;
`;

const Container = styled.div`
  width: 70vw;
  position: relative;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
`;

const ItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  font-weight: 900;
  font-size: 30px;
  margin-bottom: 30px;
`;

const Label = styled.span``;

const SelectWrapper = styled.div`
  position: relative;
  width: 200px;
`;

const SelectedOption = styled.div`
  padding: 10px;
  border-bottom: 1px solid #fff;
  cursor: pointer;
`;

const OptionsList = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 70%;
  left: 0;
  width: 200px;
  border: 1px solid gray;
  background-color: #fff;
  color: black;
  list-style: none;
  padding: 0;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const OptionItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #aac8ff;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
`;

const Button = styled.button`
  padding: 5px 30px;
  height: 40px;
  border: none;
  background: #3a578d;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2c456e;
  }
`;

const ContentWrapper = styled.div`
  padding: 15px;
`;

const ContentArea = styled.div`
  padding: 5px;
  height : 70px;
  background-color: rgba(217, 217, 217, 0.1);
  border-radius: 10px;
  margin: 10px 0;
`;

const ContentTitle = styled.div`
  font-weight: 900;
  font-size: 15px;
  margin-bottom: 5px;
`;
