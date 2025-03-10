import Image from "next/image";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import petImage from "/public/createStarModalPetImage.svg";
import arrow from "/public/arrow_right.svg";
import constellation from "/public/createStarModalConstellation.jpg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateStarModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>
          올려주신 반려동물의 사진을 바탕으로 별자리 모양이 생성될 거에요.
          반려동물 위에 점을 찍어주세요.
        </ModalTitle>
        <ModalBody>
          <ImageWrapper>
            <Image src={petImage} alt="pet image" />
            <Arrow src={arrow} alt="" />
            <Image
              src={constellation}
              alt="constellation example"
              width={355}
            />
          </ImageWrapper>
          <Info>
            <Tip>제대로 된 별자리 모양을 얻고 싶다면</Tip>
            <List>
              <li>
                <Highlight>반려동물의 몸 위</Highlight>에 점을 위치시켜 주세요.
              </li>
              <li>
                직사각형 사진보다 <Highlight>정사각형</Highlight> 사진을
                올려주세요.
              </li>
              <li>
                반려동물의 몸이 <Highlight>잘리지 않은</Highlight> 사진을
                올려주세요.
              </li>
              <li>
                전체 사진 크기에 비해 반려동물이{" "}
                <Highlight>너무 작게 나온 사진</Highlight>은 별자리 모양이{" "}
                <Highlight>정확하지 않을</Highlight> 수 있어요.
              </li>
            </List>
          </Info>
        </ModalBody>
        <Button onClick={onClose}>이해했어요</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CreateStarModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* 까만색 배경 필터 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background: #101827;
  width: 995px;
  height: 500px;
  padding: 40px 0;
  border: 1px solid #fff;
`;

const ModalTitle = styled.div`
  color: #fff;
  border-top: 1px solid #fff;
  padding-top: 20px;
  text-align: center;
  font-weight: 900;
  font-size: 18px;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Arrow = styled(Image)`
  animation: moveLeftRight 0.8s infinite alternate;

  @keyframes moveLeftRight {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(15px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

const Info = styled.div`
  padding: 10px 0;
  border: 1px solid #fff;
  color: #fff;
`;

const Tip = styled.div`
  font-weight: 900;
  font-size: 20px;
  padding-left: 10px;
`;

const List = styled.ul`
  list-style-type: circle;
  padding: 10px 40px;
`;

const Highlight = styled.span`
  color: #d793ff;
`;

const Button = styled.button`
  border-radius: 5px;
  background: #d793ff;
  border: none;
  color: #fff;
  padding: 10px 30px;
  position: absolute;
  bottom: 7px;
  right: 20px;
  cursor: pointer;
`;
