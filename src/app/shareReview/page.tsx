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
          <Label>
            장례 서비스 후기, 펫로스 극복 프로그램 후기, 극복 사례 공유 등등
            여러분의 다양한 후기를 공유해주세요.
          </Label>
        </Top>
        <Container>
          <Item>
            <Label style={{ paddingRight: "30px" }}>카테고리</Label>
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
          <Button>글쓰기</Button>
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
  width: 90vw;
  border-bottom: 1px solid #fff;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 10px;
`;

const Container = styled.div`
  width: 90vw;
  position: relative;
  padding: 10px 0;
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
  border: 1px solid #fff;
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

const Button = styled.button`
  padding: 5px 30px;
  height: 40px;
  border: none;
  background: #3a578d;
  color: #fff;
  cursor: pointer;
  position: absolute;
  top: 25px;
  right: 34px;
`;

const ContentWrapper = styled.div`
  padding: 15px;
`;

const ContentArea = styled.div`
  padding: 5px;
  border-bottom: 1px dotted #fff;
`;

const ContentTitle = styled.div`
  font-weight: 900;
  font-size: 15px;
  margin-bottom: 5px;
`;
