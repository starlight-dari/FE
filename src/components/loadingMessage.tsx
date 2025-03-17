import React from "react";
import styled, { keyframes } from "styled-components";

interface LoadingMessageProps {
  isOpen: boolean;
}

const LoadingMessage: React.FC<LoadingMessageProps> = ({ isOpen }) => {
  if (!isOpen) return null; // 모달이 열려있지 않으면 렌더링 안 함

  return (
    <Overlay>
      <ModalContainer>
        <Spinner />
        <Text>
          올려주신 반려동물의 사진을 바탕으로 별자리를 생성하고 있어요...
        </Text>
      </ModalContainer>
    </Overlay>
  );
};

export default LoadingMessage;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
`;

const Text = styled.p`
  margin-top: 15px;
  font-size: 1rem;
  color: #333;
  font-weight: 500;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #d793ff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
