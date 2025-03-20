"use client";

import styled from "styled-components";
import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

const EditOrDeleteModal = ({ memoryId }: { memoryId: number }) => {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

  const handleDelete = async (memoryId: number) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `http://${server_url}:8080/memory-stars/${memoryId}`,
        withCredentials: true,
      });

      console.log("서버 응답:", response);
      alert("별을 삭제했습니다.");
    } catch (error) {
      console.error("별 삭제 중 오류 발생:", error);
    }
  };

  return (
    <>
      <ModalContent>
        <ItemWrapper>
          <Item>수정</Item>
          <Item onClick={() => handleDelete(memoryId)}>삭제</Item>
        </ItemWrapper>
      </ModalContent>
    </>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* 까만색 배경 필터 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  position: relative;
  background: #101827;
  width: 995px;
  height: 600px;
  border: 1px solid #fff;
  color: #fff;
  z-index: 1000;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;

  &:hover {
    background-color: #ece6f0;
  }
`;

export default EditOrDeleteModal;
