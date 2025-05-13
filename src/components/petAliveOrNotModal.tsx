import axios from "axios";
import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  background: linear-gradient(to bottom, #23242b 0%, #0c172a 100%);
  height: 110px;
  padding: 40px 30px;
  color: #fff;
  border-radius: 10px;
  width: 50%;
  font-size: 16px;
  text-align: center;
  flex-direction: column;
`;

const Button = styled.button`
  background-color: #aac8ff26;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  font-family: "Pretendard-Regular", sans-serif;

  &:hover {
    background-color: #aac8ff;
  }
`;

type PetAliveOrNotModalProps = {
  onSelect: (isAlive: boolean) => void;
};

const PetAliveOrNotModal = ({ onSelect }: PetAliveOrNotModalProps) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <p>현재 반려동물과 함께하고 계신가요?</p>

        <Button onClick={() => onSelect(true)}>네, 함께하고 있어요.</Button>
        <Button onClick={() => onSelect(false)}>아니요, 떠나보냈어요.</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PetAliveOrNotModal;
