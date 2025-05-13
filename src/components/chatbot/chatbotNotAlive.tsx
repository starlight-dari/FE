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
  const introMessage = `💬 안녕하세요! 별빛다리 AI챗봇입니다.
먼저 소중한 반려 친구의 이별에 깊은 위로를 전합니다.
지금은 많이 힘드실 수 있지만, 저희가 함께하겠습니다.
🕊 장례식장 정보와
💛 펫로스 증후군 극복 프로그램을 안내해드릴게요.
도움이 필요한 항목을 선택해주세요. 언제나 곁에 있겠습니다.`;
  return (
    <ChatbotModalTemplate
      questions={notAliveQuestions}
      onClose={onClose}
      introMessage={introMessage}
    />
  );
};

export default ChatbotModalNotAlive;
