"use client";

import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Header from "../../../components/header";

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
            <Input placeholder="제목을 입력해주세요." />
          </Item>
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
              <Textarea placeholder="여러분의 후기를 공유해주세요." />
            </ContentArea>
            <ImageUpload />
          </ContentWrapper>
          <ButtonWrapper>
            <Button>등록</Button>
            <Button>취소</Button>
          </ButtonWrapper>
        </Container>
      </Body>
    </>
  );
};

const ImageUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <UploadContainer>
      <p>첨부할 사진이 있다면 첨부해주세요.</p>
      <FileInput ref={fileInputRef} type="file" accept="image/*" />
      <UploadButton onClick={handleClick}>컴퓨터에서 선택하기</UploadButton>
    </UploadContainer>
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
  padding: 5px 0;
  border-bottom: 1px solid #fff;
`;

const Title = styled.span`
  font-weight: 900;
  font-size: 30px;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  outline: none;
  background: transparent;
  color: #fff;
  font-family: "Pretendard-Regular", sans-serif;

  &::placeholder {
    font-size: 17px;
    font-family: "Pretendard-Regular";
  }
`;

const Label = styled.span`
  padding-left: 5px;
`;

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

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  right: 0;
  bottom: -40px;
`;

const Button = styled.button`
  padding: 5px 30px;
  height: 40px;
  border: none;
  background: #aac8ff;
  color: #fff;
  cursor: pointer;
`;

const ContentWrapper = styled.div``;

const ContentArea = styled.div`
  padding: 10px;
  border-bottom: 1px solid #fff;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadContainer = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #fff;
`;

const UploadButton = styled.button`
  margin-top: 5px;
  padding: 5px 30px;
  height: 40px;
  border: none;
  background: #3a578d;
  color: #fff;
  cursor: pointer;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  background: transparent;
  border: none;
  resize: none;
  outline: none;
  color: #fff;
  font-family: "Pretendard-Regular", sans-serif;

  &::placeholder {
    font-family: "Pretendard-Regular", sans-serif;
  }
`;
