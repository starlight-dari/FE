"use client";

import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Header from "../../components/header";

export default function Page() {
  //   const router = useRouter();
  const [checked, setChecked] = useState(false);

  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [activitySelected, setActivitySelected] = useState("상황");

  const [isEmotionOpen, setIsEmotionOpen] = useState(false);
  const [emotionSelected, setEmotionSelected] = useState("감정");

  const handleActivitySelect = (option: string) => {
    setActivitySelected(option);
    setIsActivityOpen(false);
  };

  const handleEmotionSelect = (option: string) => {
    setEmotionSelected(option);
    setIsEmotionOpen(false);
  };

  //////////////////////
  // WALK 산책
  // PLAY 놀이
  // TRAINING 훈련
  // FOOD 먹이/간식
  // HOSPITAL 병원
  // GROOMING 목욕/미용
  // TRAVEL 여행
  // ANNIVERSARY 기념일
  // RELAX 쉬는 시간

  // HAPPY 행복
  // TOUCHED 감동
  // PEACEFUL 안정/평화
  // SAD 슬픔
  // GRATEFUL 감사
  // SURPRISED 놀람
  // REGRET 아쉬움
  // LOVE 사랑
  // EXPECTATION 기대감
  /////////////////////////

  return (
    <>
      <Header />
      <Body>
        <Container>
          <PhotoBox />
          <ItemWrapper>
            <Title>별 생성하기</Title>
            <Input placeholder="새로운 별의 이름을 적어주세요." />
            <Item>
              <Label>어떤 상황이었나요? 어떤 감정을 느꼈나요?</Label>
              <SelectBox>
                <SelectWrapper>
                  <SelectedOption
                    onClick={() => setIsActivityOpen(!isActivityOpen)}
                  >
                    {activitySelected}
                  </SelectedOption>
                  <OptionsList isOpen={isActivityOpen}>
                    <OptionItem onClick={() => handleActivitySelect("산책")}>
                      산책
                    </OptionItem>
                    <OptionItem onClick={() => handleActivitySelect("놀이")}>
                      놀이
                    </OptionItem>
                    <OptionItem onClick={() => handleActivitySelect("훈련")}>
                      훈련
                    </OptionItem>
                    <OptionItem
                      onClick={() => handleActivitySelect("먹이/간식")}
                    >
                      먹이/간식
                    </OptionItem>
                    <OptionItem onClick={() => handleActivitySelect("병원")}>
                      병원
                    </OptionItem>
                    <OptionItem
                      onClick={() => handleActivitySelect("목욕/미용")}
                    >
                      목욕/미용
                    </OptionItem>
                    <OptionItem onClick={() => handleActivitySelect("여행")}>
                      여행
                    </OptionItem>
                    <OptionItem onClick={() => handleActivitySelect("기념일")}>
                      기념일
                    </OptionItem>
                    <OptionItem
                      onClick={() => handleActivitySelect("쉬는 시간")}
                    >
                      쉬는 시간
                    </OptionItem>
                  </OptionsList>
                </SelectWrapper>
                <SelectWrapper>
                  <SelectedOption
                    onClick={() => setIsEmotionOpen(!isEmotionOpen)}
                  >
                    {emotionSelected}
                  </SelectedOption>
                  <OptionsList isOpen={isEmotionOpen}>
                    <OptionItem onClick={() => handleEmotionSelect("행복")}>
                      행복
                    </OptionItem>
                    <OptionItem onClick={() => handleEmotionSelect("감동")}>
                      감동
                    </OptionItem>
                    <OptionItem
                      onClick={() => handleEmotionSelect("안정/평화")}
                    >
                      안정/평화
                    </OptionItem>
                    <OptionItem onClick={() => handleEmotionSelect("슬픔")}>
                      슬픔
                    </OptionItem>
                    <OptionItem onClick={() => handleEmotionSelect("감사")}>
                      감사
                    </OptionItem>
                    <OptionItem onClick={() => handleEmotionSelect("놀람")}>
                      놀람
                    </OptionItem>
                    <OptionItem onClick={() => handleEmotionSelect("아쉬움")}>
                      아쉬움
                    </OptionItem>
                    <OptionItem onClick={() => handleEmotionSelect("사랑")}>
                      사랑
                    </OptionItem>
                    <OptionItem onClick={() => handleEmotionSelect("기대감")}>
                      기대감
                    </OptionItem>
                  </OptionsList>
                </SelectWrapper>
              </SelectBox>
            </Item>
            <Item>
              <Label>기록하고 싶은 내용을 작성해 주세요.</Label>
              <Textarea
                placeholder={`어떤 일이 있었는지 적어주세요.\n자세히 적어주실수록, 더 정확한 내용의 편지를 받아보실 수 있어요!`}
              />
            </Item>
            <Item>
              <Label>어떤 사진인가요?</Label>
              <RadioButtonWrapper htmlFor="petPhoto">
                <RadioButton
                  type="radio"
                  name="photoType"
                  id="petPhoto"
                  value="petPhoto"
                />
                <span>반려동물의 사진이에요</span>
              </RadioButtonWrapper>
              <RadioButtonWrapper htmlFor="notPetPhoto">
                <RadioButton
                  type="radio"
                  name="photoType"
                  id="notPetPhoto"
                  value="notPetPhoto"
                />
                <span>반려동물의 사진이 아니에요(풍경, 사물 등)</span>
              </RadioButtonWrapper>
            </Item>
            <ToggleWrapper>
              <Label>별빛 저장소에 별 공개하기</Label>
              <ToggleSwitch>
                <ToggleInput
                  type="checkbox"
                  id="toggle"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
                <ToggleLabel htmlFor="toggle" />
              </ToggleSwitch>
            </ToggleWrapper>
          </ItemWrapper>
          <Button>별 생성 취소하기</Button>
          <SubmitButton type="submit" value="새로운 별 생성하기" />
        </Container>
      </Body>
    </>
  );
}

const Body = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 90vw;
  height: 565px;
  background-color: #fff;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const PhotoBox = styled.div`
  width: 460px;
  height: 535px;
  background-color: #ece6f0;
  border: 1px dashed #65558f;
`;

const ItemWrapper = styled.div`
  margin-left: 38px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const Title = styled.div`
  font-weight: 900;
  font-size: 20px;
`;

const Label = styled.div`
  font-weight: 600;
`;

const Input = styled.input`
  width: 350px;
  padding: 10px;
  border: 1px solid gray;
  outline: none;
`;

const SelectBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100px;
`;

const SelectedOption = styled.div`
  padding: 10px;
  border: 1px solid gray;
  background-color: #fff;
  cursor: pointer;
`;

const OptionsList = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 70%;
  left: 0;
  width: 100px;
  border: 1px solid gray;
  background-color: #fff;
  list-style: none;
  padding: 0;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  z-index: 100;
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
  border: 1px solid #65558f;
  border-radius: 100px;
  background: #fff;
  color: #65558f;
  cursor: pointer;
  position: absolute;
  bottom: 25px;
  right: 190px;
`;

const SubmitButton = styled.input`
  width: 146px;
  height: 40px;
  border: none;
  border-radius: 100px;
  background: #65558f;
  color: #fff;
  cursor: pointer;
  position: absolute;
  bottom: 25px;
  right: 34px;
`;

const ToggleSwitch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* 기존의 checkbox 버튼 숨기기 */
const ToggleInput = styled.input`
  display: none;
`;

/* 토글 스타일 지정 */
const ToggleLabel = styled.label`
  position: relative;
  display: block;
  width: 40px;
  height: 24px;
  background-color: #ccc;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s ease;
  }

  /* 토글 ON 스타일 적용 */
  ${ToggleInput}:checked + & {
    background-color: #65558f;
  }

  /* 토글 ON인 경우 버튼 이동 */
  ${ToggleInput}:checked + &::before {
    transform: translateX(16px);
  }
`;

const ToggleWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Textarea = styled.textarea`
  width: 500px;
  height: 150px;
  border: 1px solid gray;
  padding: 10px;
  resize: none;
  outline: none;

  &::placeholder {
    font-family: "Pretendard-Regular", sans-serif; /* placeholder 글씨체 적용 */
    font-size: 14px;
    color: #999;
  }
`;

const RadioButton = styled.input`
  -webkit-appearance: none; /* 웹킷 브라우저에서 기본 스타일 제거*/
  -moz-appearance: none; /* 모질라 브라우저에서 기본 스타일 제거*/
  appearance: none; /*기본 브라우저에서 기본 스타일 제거*/
  width: 13px;
  height: 13px;
  border: 1px solid #ccc;
  border-radius: 100%;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: #65558f; /*체크 시 내부 원 색상*/
    border: 3px solid #fff; /*라인이 아닌, 라인과 원 사이 색상*/
    box-shadow: 0 0 0 1px #65558f; /*라인*/
  }
`;

const RadioButtonWrapper = styled.label`
  display: flex;
  gap: 5px;
  padding: 5px 10px;
  border: 1px solid #65558f;
  border-radius: 5px;

  &:hover {
    background-color: #ece6f0;
  }
`;
