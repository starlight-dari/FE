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
                  <img 
                    src="https://img.icons8.com/ios-filled/50/ffffff/expand-arrow.png" 
                    alt="Dropdown Icon" 
                    width="20" 
                    height="20"
                    style={{ marginLeft: '10px' }}
                    />
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
                <ContentBox>
                  <ContentCategory>장례 서비스</ContentCategory>
                  <ContentTitle>0000 장례 서비스 후기</ContentTitle>
                </ContentBox>
                <ContentText>글내용입니다글내용입니다글내용입니다글내용입니다</ContentText>
            </ContentArea>
            <ContentArea>
                <ContentBox>
                  <ContentCategory>장례 서비스</ContentCategory>
                  <ContentTitle>0000 장례 서비스 후기</ContentTitle>
                </ContentBox>
                <ContentText>글내용입니다글내용입니다글내용입니다글내용입니다</ContentText>
            </ContentArea>
            <ContentArea>
                <ContentBox>
                  <ContentCategory>장례 서비스</ContentCategory>
                  <ContentTitle>0000 장례 서비스 후기</ContentTitle>
                </ContentBox>
                <ContentText>글내용입니다글내용입니다글내용입니다글내용입니다</ContentText>
            </ContentArea>
            <ContentArea>
                <ContentBox>
                  <ContentCategory>장례 서비스</ContentCategory>
                  <ContentTitle>0000 장례 서비스 후기</ContentTitle>
                </ContentBox>
                <ContentText>글내용입니다글내용입니다글내용입니다글내용입니다</ContentText>
            </ContentArea>
            <ContentArea>
                <ContentBox>
                  <ContentCategory>장례 서비스</ContentCategory>
                  <ContentTitle>0000 장례 서비스 후기</ContentTitle>
                </ContentBox>
                <ContentText>글내용입니다글내용입니다글내용입니다글내용입니다</ContentText>
            </ContentArea>
          </ContentWrapper>
          {/* 페이지네이션 추가 필요 */}
          <ButtonWrapper>
            <Button>
              <img src="https://img.icons8.com/?size=100&id=11737&format=png&color=ADC3F3"
                  width="15" 
                  height="15"
                  style={{ marginRight: '5px' }}/>
              글쓰기
              </Button>
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
`;

const Label = styled.span``;

const SelectWrapper = styled.div`
  position: relative;
  width: 200px;
  z-index: 10;
`;

const SelectedOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #fff;
  cursor: pointer;
  pointer-events: auto; 
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
  padding-right: 15px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-times: center;
  padding: 12px 30px;
  height: 40px;
  border: none;
  background-color: rgb(170,200,255,0.15);
  color: #ADC3F3;
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
  height : 95px;
  align-itmes: center;
  justify-content: center;
  background-color: rgba(217, 217, 217, 0.1);
  border-radius: 10px;
  margin: 10px 0;
  gap: 10px;
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  padding: 5px;
  padding-left: 10px;
`;

const ContentTitle = styled.div`
  font-weight: 200;
  margin-top : 5px;
  margin-bottom : 10px;
  font-size: 20px;
`;

const ContentCategory = styled.div`
  background-color: rgba(170, 200, 255, 0.5);
  height : 35px;
  width : 150px;
  border-radius: 5px;
  display : flex;
  justify-content: center;
  align-items: center;
`;

const ContentText = styled.div`
  padding-left: 10px;
  font-size: 16px;
  margin-top: 10px;
`;
