"use client";

import "../globals.css";
import styled from "styled-components";
import React, { useState } from "react";
import Header from "../../components/header";
import ImageUpload from "../../components/imageUpload";

export default function Page() {
  const [genderSelected, setGenderSelected] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [personalitySelected, setPersonalitySelected] = useState("성격");

  const handleSelect = (option: string) => {
    setPersonalitySelected(option);
    setIsOpen(false);
  };

  const today = new Date().toISOString().split("T")[0];
  const [birthDate, setBirthDate] = useState(today);
  const [starDate, setStarDate] = useState(today);

  return (
    <>
      <Header />
      <Body>
        <ImageUpload />
        <ItemWrapper>
          <Title>새 별자리 만들기</Title>
          <Item>
            <Label style={{ paddingRight: "24px" }}>이름</Label>
            <Input placeholder="반려동물의 이름으로 별자리가 만들어질 거에요." />
          </Item>
          <Item>
            <Label style={{ paddingRight: "38px" }}>종</Label>
            <Input placeholder="종을 적어주세요. (예: 강아지, 고양이)" />
          </Item>
          <Item>
            <Label style={{ paddingRight: "24px" }}>성별</Label>
            <GenderButton>
              <input
                type="radio"
                id="male"
                name="male"
                value="male"
                checked={genderSelected === "male"}
                onChange={(e) => setGenderSelected(e.target.value)}
              />
              <label htmlFor="male">남자</label>
              <input
                type="radio"
                id="female"
                name="female"
                value="female"
                checked={genderSelected === "female"}
                onChange={(e) => setGenderSelected(e.target.value)}
              />
              <label htmlFor="female">여자</label>
              <input
                type="radio"
                id="undefined"
                name="undefined"
                value="undefined"
                checked={genderSelected === "undefined"}
                onChange={(e) => setGenderSelected(e.target.value)}
              />
              <label htmlFor="undefined">모르겠어요</label>
            </GenderButton>
          </Item>
          <Item>
            <Label style={{ paddingRight: "30px" }}>태어난 날</Label>
            <DateInput
              type="date"
              value={birthDate}
              max={today}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </Item>
          <Item>
            <Label style={{ paddingRight: "26px" }}>별이 된 날</Label>
            <DateInput
              type="date"
              value={starDate}
              max={today}
              onChange={(e) => setStarDate(e.target.value)}
            />
          </Item>
          <Item>
            <Label style={{ paddingRight: "62px" }}>성격</Label>
            <SelectWrapper>
              <SelectedOption onClick={() => setIsOpen(!isOpen)}>
                {personalitySelected}
              </SelectedOption>
              <OptionsList isOpen={isOpen}>
                <OptionItem onClick={() => handleSelect("활발함")}>
                  활발함
                </OptionItem>
                <OptionItem onClick={() => handleSelect("조용함")}>
                  조용함
                </OptionItem>
                <OptionItem onClick={() => handleSelect("귀여움")}>
                  귀여움
                </OptionItem>
              </OptionsList>
            </SelectWrapper>
          </Item>
        </ItemWrapper>
        <Button>새 별자리 만들기</Button>
      </Body>
    </>
  );
}

const Body = styled.div`
  display: flex;
  padding: 30px;
  color: white;
  position: relative;
  align-items: center;
  gap: 150px;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  font-weight: 900;
  font-size: 20px;
  margin-bottom: 30px;
`;

const Label = styled.span``;

const GenderButton = styled.span`
  input[type="radio"] {
    display: none;
  }

  input[type="radio"]:checked + label {
    background-color: #22225e;
    color: #fff;
  }

  label {
    display: inline-block;
    padding: 10px 20px;
    border: 1px solid gray;
    cursor: pointer;

    &:hover {
      background-color: #ece6f0;
      color: black;
    }
  }
`;

const Input = styled.input`
  width: 350px;
  padding: 10px;
  border: 1px solid gray;
  outline: none;
`;

const DateInput = styled.input`
  padding: 10px;
  border: 1px solid gray;
  cursor: pointer;
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100px;
`;

const SelectedOption = styled.div`
  padding: 10px;
  border: 1px solid gray;
  background-color: #fff;
  color: black;
  cursor: pointer;
`;

const OptionsList = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 70%;
  left: 0;
  width: 100px;
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
    background-color: #ece6f0;
  }
`;

const Button = styled.button`
  width: 146px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background: #22225e;
  color: #fff;
  cursor: pointer;
  position: absolute;
  bottom: 25px;
  right: 70px;
`;
