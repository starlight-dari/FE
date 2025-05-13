import React from "react";
import ChatbotModalTemplate from "./chatbotTemplate";

const notAliveQuestions = [
  {
    id: 2,
    category: "장례식장 정보",
    question: "어느 지역의 장례식장을 찾아볼까요?",
  },
  {
    id: 3,
    category: "펫로스증후군 극복 프로그램",
    question: `다음은 펫로스 증후군 극복 프로그램 링크 목록입니다.\n
[마인드카페 센터_바로가기](https://center.mindcafe.co.kr/program_petloss)\n
[마음치유모임 with 펫로스_바로가기](https://www.gangnam.go.kr/contents/mind_healing/1/view.do?mid=ID04_04075401)`,
  },
];

const ChatbotModalNotAlive = ({ onClose }: { onClose: () => void }) => {
  return (
    <ChatbotModalTemplate questions={notAliveQuestions} onClose={onClose} />
  );
};

export default ChatbotModalNotAlive;
