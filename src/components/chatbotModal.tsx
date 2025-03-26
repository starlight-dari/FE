import axios from "axios";
import Image from "next/image";
import send from "/public/send.svg";
import close from "/public/close.svg";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface QuestionData {
  id: number;
  category: string;
  question: string;
}

const questions: QuestionData[] = [
  {
    id: 0,
    category: "펫 보험 정보",
    question: `삼성화재, 메리츠화재, 한화보험의 펫보험을 비교하여 회원님께 가장 적합한 보험을 추천해드릴게요!\n
반려동물 정보를 알려주시면 맞춤형 펫보험을 찾아드릴게요.\n
예) 반려동물의 나이, 품종, 건강상태, 기존 질병 여부, 원하는 보장 범위(예: 입원/수술/통원 치료, 특약 등)를 알려주세요.
`,
  },
  {
    id: 1,
    category: "노령견/노묘 전문 정보",
    question: `노령견/노묘 관련 전문 헬스케어 정보를 알려드릴게요. 현재 반려동물의 상태와 궁금하신 점을 알려주세요.\n
예) 13살 고양이를 키우고 있는데, 요즘 식욕이 줄고 체중이 감소하는 것 같아요. 노묘의 건강을 유지하기 위한 식단 관리나 필요한 영양제가 있을까요?
`,
  },
  {
    id: 2,
    category: "장례식장 정보",
    question: "어느 지역의 장례식장을 찾아볼까요?",
  },
  {
    id: 3,
    category: "펫로스증후군 극복 프로그램",
    question: `다음은 펫로스 증후군 극복 프로그램 링크 목록입니다.\n
마인드카페 센터: https://center.mindcafe.co.kr/program_petloss\n
마음치유모임 with 펫로스: https://www.gangnam.go.kr/contents/mind_healing/1/view.do?mid=ID04_04075401`,
  },
];

interface ChatMessageSet {
  chatId: number;
  category: number;
  question: string;
  answer: string;
  createdAt: string;
  memberId: number;
}

const ChatbotModal = ({ onClose }: { onClose: () => void }) => {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  const [question, setQuestion] = useState<string>("");
  const [category, setCategory] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<
    {
      question: string;
      response: string;
      extraMessage?: string;
      showBackButton?: boolean;
      categories?: string[];
    }[]
  >([]);

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
    console.log(`${id}번 카테고리 선택`);

    const selectedQuestion = questions.find((q) => q.id === id)?.question || "";

    setChatMessages((prevMessages) => [
      ...prevMessages,
      {
        question: String(id),
        response: selectedQuestion,
        extraMessage:
          "다른 카테고리가 궁금하시다면 돌아가기 버튼을 눌러주세요.",
        showBackButton: true,
      },
    ]);
  };

  const handleGoBack = () => {
    setCategory(null);
    setChatMessages((prevMessages) => [
      ...prevMessages,
      {
        question: "돌아가기",
        response: "어느 카테고리에 관련된 것이 궁금하신가요?",
        categories: [
          "펫 보험 정보",
          "노령견/노묘 전문 정보",
          "장례식장 정보",
          "펫로스증후군 극복 프로그램",
        ],
      },
    ]);
  };

  const handleSendMessage = async () => {
    console.log("category: ", category);
    console.log("question: ", question);

    if (category === null || !question.trim()) return;

    try {
      const response = await axios.post(
        `http://${server_url}:8080/chat`,
        {
          category,
          question,
        },
        { withCredentials: true }
      );

      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          question,
          response: response.data.answer,
          extraMessage:
            "추가적인 질문이 있다면 답변해드릴게요. 다른 카테고리가 궁금하시다면 돌아가기 버튼을 눌러주세요.",
          showBackButton: true,
        },
      ]);
      setQuestion("");
    } catch (error) {
      console.error("메시지 전송 중 오류 발생:", error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <Header>
          <Title>AI 별빛 *</Title>
          <CloseButton onClick={onClose}>
            <Image src={close} alt="close" />
          </CloseButton>
        </Header>
        <ChatWindow ref={chatWindowRef}>
          <IntroText>
            안녕하세요! 별빛다리 AI챗봇입니다.
            <br />
            장례식장, 펫로스증후군 극복 프로그램, 펫 보험, 노령견/노묘 전문
            정보에 대해 무엇이든 물어보세요. 최선을 다해 답변해드릴게요.
            <br />
            <br />
            카테고리를 선택해주세요.
          </IntroText>
          {questions.map((question) => (
            <CategoryButton
              key={question.id}
              onClick={() => handleCategorySelect(question.id)}
            >
              {question.category}
            </CategoryButton>
          ))}
          {chatMessages.map((chat, index) => (
            <ChatBubbleContainer
              key={index}
              ref={index === chatMessages.length - 1 ? lastMessageRef : null}
            >
              <ChatBubble isUser={true}>{chat.question}</ChatBubble>
              <ChatBubble isUser={false}>{chat.response}</ChatBubble>
              {chat.extraMessage && (
                <ChatBubble isUser={false}>{chat.extraMessage}</ChatBubble>
              )}
              {chat.showBackButton && (
                <CategoryButton onClick={handleGoBack}>돌아가기</CategoryButton>
              )}
              {chat.categories &&
                chat.categories.map((category, idx) => (
                  <CategoryButton
                    key={idx}
                    onClick={() => handleCategorySelect(idx)}
                  >
                    {category}
                  </CategoryButton>
                ))}
            </ChatBubbleContainer>
          ))}
        </ChatWindow>
        <InputContainer>
          <ChatInput
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
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

export default ChatbotModal;

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

const Title = styled.div``;

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

const CategoryButton = styled.button`
  cursor: pointer;
  font-family: "Pretendard-Regular", sans-serif;
  font-size: 14px;
  color: #fff;
  background: linear-gradient(to bottom, #d9d9d91a 0%, #7373731a 100%);
  width: 310px;
  padding: 14px;
  border-radius: 5px;
  text-align: left;
  border: none;
  line-height: 1.5;
  letter-spacing: 1.2px;

  &:hover {
    background: #4c566b;
  }
`;

const ChatBubbleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 7px;
`;

const ChatBubble = styled.div<{ isUser: boolean }>`
  background: ${(props) =>
    props.isUser
      ? "#E2E8F6"
      : "linear-gradient(to bottom, #d9d9d91a 0%, #7373731a 100%)"};
  color: ${(props) => (props.isUser ? "#3F4A61" : "#fff")};
  padding: 14px;
  border-radius: 5px;
  margin-left: ${(props) => (props.isUser ? "90px" : "0")};
  width: 282px;
  padding: 14px;
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
