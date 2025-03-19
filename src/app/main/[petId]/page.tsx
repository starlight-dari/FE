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

export default function Page() {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  const params = useParams();
  const petId = Number(params.petId);

  const [petData, setPetData] = useState<PetData | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedStarId, setSelectedStarId] = useState<number | null>(null);
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
          //   withCredentials: true,
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
    getPetStarInfo();
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
        {/* 반려동물 이름 */}
        {/* <ConstellationName>{petData.petId}</ConstellationName> */}
        <BottomMessage
          ref={messageRef}
          show={messageVisible}
          onAddClick={() => handleAddStar(selectedStarId)}
        />
      </Body>
      {isAddStarModalOpen && (
        <AddStarModal starId={selectedStarId} onClose={closeAddStarModal} />
      )}
      {isStarInfoModalOpen && (
        <StarPage starId={selectedStarId} onClose={closeStarInfoModal} />
      )}
    </>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: calc(100vh - 82px);
  color: #fff;
`;

const ConstellationName = styled.div`
  font-size: 35px;
`;
