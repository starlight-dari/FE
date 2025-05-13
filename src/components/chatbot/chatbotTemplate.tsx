import axios from "axios";
import Image from "next/image";
import send from "/public/send.svg";
import close from "/public/close.svg";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ChatBubble, ChatMessage, CategoryButton } from "./chatbotUI";

interface QuestionData {
  id: number;
  category: string;
  question: string;
}

const ChatbotModalTemplate = ({
  questions,
  onClose,
  introMessage,
}: {
  questions: QuestionData[];
  onClose: () => void;
  introMessage: string;
}) => {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  const [question, setQuestion] = useState<string>("");
  const [category, setCategory] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [chatMessages]);

  const handleCategorySelect = (id: number) => {
    setCategory(id);
    const selected = questions.find((q) => q.id === id);
    if (!selected) return;

    setChatMessages((prev) => [
      ...prev,
      {
        question: selected.category,
        response: selected.question,
        extraMessage:
          "다른 카테고리가 궁금하시다면 돌아가기 버튼을 눌러주세요.",
        showBackButton: true,
      },
    ]);
  };

  const handleGoBack = () => {
    setCategory(null);
    setChatMessages((prev) => [
      ...prev,
      {
        question: "돌아가기",
        response: "어느 카테고리에 관련된 것이 궁금하신가요?",
        categories: questions.map((q) => q.category),
      },
    ]);
  };

  const handleSendMessage = async () => {
    if (category === null || !question.trim()) return;

    const newMessage = {
      question,
      response: "답변을 생성하고 있어요...",
      showBackButton: false,
    };
    setChatMessages((prev) => [...prev, newMessage]);
    setQuestion("");

    try {
      const response = await axios.post(
        `http://${server_url}:8080/chat`,
        { category, question },
        { withCredentials: true }
      );

      setChatMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1
            ? {
                ...msg,
                response: response.data.answer,
                extraMessage:
                  "추가적인 질문이 있다면 답변해드릴게요. 다른 카테고리가 궁금하시다면 돌아가기 버튼을 눌러주세요.",
                showBackButton: true,
              }
            : msg
        )
      );
    } catch (e) {
      console.error("메시지 전송 중 오류 발생:", e);
      setChatMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1
            ? {
                ...msg,
                response: "오류가 발생했습니다. 다시 시도해주세요.",
                showBackButton: true,
              }
            : msg
        )
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <Header>
          <div>AI 별빛 *</div>
          <CloseButton onClick={onClose}>
            <Image src={close} alt="close" />
          </CloseButton>
        </Header>
        <ChatWindow ref={chatWindowRef}>
          {category === null && (
            <>
              <IntroText>{introMessage}</IntroText>
              {questions.map((q) => (
                <CategoryButton
                  key={q.id}
                  onClick={() => handleCategorySelect(q.id)}
                >
                  {q.category}
                </CategoryButton>
              ))}
            </>
          )}
          {chatMessages.map((chat, idx) => (
            <ChatMessage
              key={idx}
              index={idx === chatMessages.length - 1 ? -1 : idx}
              chat={chat}
              lastMessageRef={lastMessageRef}
              handleGoBack={handleGoBack}
              handleCategorySelect={handleCategorySelect}
            />
          ))}
        </ChatWindow>
        <InputContainer>
          <ChatInput
            type="text"
            value={question}
            onChange={(e: any) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="궁금한 점이 있나요?"
          />
          <SendButton onClick={handleSendMessage}>
            <Image src={send} alt="send" />
          </SendButton>
        </InputContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ChatbotModalTemplate;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: end;
  justify-content: start;
`;

const ModalContainer = styled.div`
  background: #242b39;
  width: 432px;
  height: 600px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  background: #3f4a61;
  color: #adc3f3;
  padding: 11px 16px;
  border-radius: 15px;
  width: 400px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ChatWindow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 463px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px;
  width: 400px;
`;

const IntroText = styled.p`
  font-size: 14px;
  color: #fff;
  background: linear-gradient(to bottom, #d9d9d91a 0%, #7373731a 100%);
  width: 282px;
  padding: 14px;
  border-radius: 5px;
  text-align: left;
  line-height: 1.5;
  letter-spacing: 1.2px;
`;

const InputContainer = styled.div`
  display: flex;
  width: 400px;
  position: absolute;
  bottom: 0;
  padding: 16px;
  background: #242b39;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 8px;
  outline: none;
  background: none;
  border: none;
  color: #fff;
`;

const SendButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
