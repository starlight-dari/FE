import React from "react";
import ChatbotModalTemplate from "./chatbotTemplate";

const aliveQuestions = [
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
];

const ChatbotModalAlive = ({ onClose }: { onClose: () => void }) => {
  const introMessage = `💬 안녕하세요! 별빛다리 AI챗봇입니다. 반려 친구가 지금 함께하고 있다니 정말 다행이에요.
건강하고 행복한 시간을 오래도록 이어가실 수 있도록
🐶 펫 보험 정보와
🐾 노령견/노묘를 위한 전문 관리 정보를 안내해드릴게요.
궁금한 주제를 선택해주세요!`;
  return (
    <ChatbotModalTemplate
      questions={aliveQuestions}
      onClose={onClose}
      introMessage={introMessage}
    />
  );
};

export default ChatbotModalAlive;
