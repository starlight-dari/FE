"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../../components/header";
import styled from "styled-components";
import BottomMessage from "../../../components/addStarMessage";
import AddStarModal from "../../../components/addStarModal";
import ConstellationCanvas, {
  PetData,
  Star,
} from "../../../components/constellationCanvas";
import StarPage from "../../../components/starModal";
import Image from "next/image";
import chatbot_logo_white from "/public/chatbot_logo_white.svg";
import chatbot_logo_colored from "/public/chatbot_logo_colored.svg";
import ChatbotModalAlive from "../../../components/chatbot/chatbotAlive";
import ChatbotModalNotAlive from "../../../components/chatbot/chatbotNotAlive";

export default function Page() {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  const params = useParams();
  const petId = Number(params.petId);

  const [petData, setPetData] = useState<PetData | null>(null);
  const [petAlive, setPetAlive] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const [selectedStarId, setSelectedStarId] = useState<number | null>(null);
  const [selectedMemoryId, setSelectedMemoryId] = useState<number>(0); // 임의 지정
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isChatbotTabHovered, setIsChatbotTabHovered] = useState(false);

  const [isAddStarModalOpen, setIsAddStarModalOpen] = useState(false);
  const [isStarInfoModalOpen, setIsStarInfoModalOpen] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);

  const openAddStarModal = () => {
    setIsAddStarModalOpen(true);
  };

  const closeAddStarModal = () => {
    setIsAddStarModalOpen(false);
    setSelectedStarId(null); // 모달 닫을 때 선택된 별 해제
  };

  const openStarInfoModal = () => {
    setIsStarInfoModalOpen(true);
  };

  const closeStarInfoModal = () => {
    setIsStarInfoModalOpen(false);
    setSelectedStarId(null); // 모달 닫을 때 선택된 별 해제
  };

  const handleStarClick = (star: Star) => {
    setSelectedStarId(star.star_id);
    setIsAddStarModalOpen(false);
    setIsStarInfoModalOpen(false);

    if (star.written) {
      setSelectedMemoryId(star.memory_id);
      openStarInfoModal(); // 추억별 모달 띄우기
    } else {
      setMessageVisible(true); // BottomMessage 표시
    }
  };

  // 바깥 클릭 시 메시지 숨기기, 별 효과 제거
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !messageRef.current?.contains(event.target as Node) &&
        !isAddStarModalOpen &&
        !isStarInfoModalOpen
      ) {
        setMessageVisible(false);
        setSelectedStarId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAddStarModalOpen, isStarInfoModalOpen]);

  const handleAddStar = (starId: number | null) => {
    setMessageVisible(false);

    if (starId !== null) {
      console.log(`아이디 ${starId} 별에 추억을 추가할게요.`);
      openAddStarModal();
    }
  };

  useEffect(() => {
    const getPetStarInfo = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `http://${server_url}:8080/pets/${petId}/stars`,
          withCredentials: true,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        });

        console.log("서버 응답:", response);
        setPetData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("반려동물의 별자리 요청 중 오류 발생:", error);
        setLoading(false);
      }
    };
    const getPetAliveOrNot = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `http://${server_url}:8080/pets/${petId}/live`,
          withCredentials: true,
        });
        console.log("사망 여부:", response);
        setPetAlive(response.data.live);
      } catch (error) {
        console.error("반려동물의 사망 여부 조회 중 오류 발생:", error);
      }
    };
    getPetStarInfo();
    getPetAliveOrNot();
  }, [petId, isAddStarModalOpen, isStarInfoModalOpen, server_url]);

  if (loading) return <p>로딩 중...</p>;
  if (!petData) return <p>데이터를 불러올 수 없습니다.</p>;

  return (
    <>
      <Header />
      <Body>
        <ConstellationCanvas
          petData={petData}
          selectedStarId={selectedStarId}
          onStarClick={handleStarClick}
        />
        <ConstellationName>{petData.petName}자리</ConstellationName>
        <ChatbotTab
          onClick={() => setIsChatbotOpen(true)}
          onMouseEnter={() => setIsChatbotTabHovered(true)}
          onMouseLeave={() => setIsChatbotTabHovered(false)}
        >
          <Image
            src={
              isChatbotTabHovered ? chatbot_logo_colored : chatbot_logo_white
            }
            alt="chatbot"
          />
          AI 별빛 *
        </ChatbotTab>
        <BottomMessage
          ref={messageRef}
          show={messageVisible}
          onAddClick={() => handleAddStar(selectedStarId)}
        />
      </Body>
      {isChatbotOpen &&
        (petAlive ? (
          <ChatbotModalAlive onClose={() => setIsChatbotOpen(false)} />
        ) : (
          <ChatbotModalNotAlive onClose={() => setIsChatbotOpen(false)} />
        ))}

      {isAddStarModalOpen && (
        <AddStarModal starId={selectedStarId} onClose={closeAddStarModal} />
      )}
      {isStarInfoModalOpen && (
        <StarPage
          // starId={selectedStarId}
          memoryId={selectedMemoryId}
          onClose={closeStarInfoModal}
        />
      )}
    </>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: calc(100vh - 90px);
  color: #fff;
  position: relative;
`;

const ConstellationName = styled.div`
  font-size: 35px;
  position: absolute;
  bottom: 20px;
  font-weight: bold;
`;

const ChatbotTab = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  position: absolute;
  bottom: 6px;
  left: 15px;
  font-size: 25px;
  color: #fff;
  cursor: pointer;
  background: rgba(173, 195, 243, 0.55);
  padding: 10px 20px;
  border-radius: 10px;

  &:hover {
    color: #adc3f3;
  }
`;
