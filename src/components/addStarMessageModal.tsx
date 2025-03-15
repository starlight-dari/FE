import React from "react";
import styled from "styled-components";

const MessageWrapper = styled.div<{ show: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #d8d7ff;
  color: #070474;
  padding: 20px;
  text-align: center;
  font-size: 16px;
  border-top: 2px solid #070474;
  transition: transform 0.5s ease-out;
  transform: ${(props) => (props.show ? "translateY(0)" : "translateY(100%)")};
`;

const Button = styled.button`
  background-color: #070474;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  font-family: "Pretendard-Regular", sans-serif;

  &:hover {
    background-color: #d793ff;
  }
`;

const BottomMessage = React.forwardRef<
  HTMLDivElement,
  {
    show: boolean;
    onAddClick: () => void;
  }
>(({ show, onAddClick }, ref) => {
  return (
    <MessageWrapper ref={ref} show={show}>
      <p>이 별은 아직 기록되지 않았어요.</p>
      <p>이 별에 추억을 기록해볼까요?</p>
      <Button onClick={onAddClick}>기록하기</Button>
    </MessageWrapper>
  );
});

BottomMessage.displayName = "BottomMessage";

export default BottomMessage;
