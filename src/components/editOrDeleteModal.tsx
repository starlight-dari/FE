"use client";

import styled from "styled-components";
import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

interface MoreModalProps {
  onClose: () => void;
  memoryId: number;
}

const EditOrDeleteModal: React.FC<MoreModalProps> = ({ onClose, memoryId }) => {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

  const handleEdit = async (memoryId: number) => {
    console.log("수정할 memoryID: ", memoryId);
  };

  //   const handleEdit = async (memoryId: number) => {
  //     try {
  //       const response = await axios({
  //         method: "PATCH",
  //         url: `http://${server_url}:8080/memory-stars/${memoryId}`,
  //         withCredentials: true,
  //         data: {}
  //       });

  //       console.log("서버 응답:", response);
  //       alert("별을 수정했습니다.");
  //       onClose();
  //     } catch (error) {
  //       console.error("별 수정 중 오류 발생:", error);
  //     }
  //   };

  const handleDelete = async (memoryId: number) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `http://${server_url}:8080/memory-stars/${memoryId}`,
        withCredentials: true,
      });

      console.log("서버 응답:", response);
      alert("별을 삭제했습니다.");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("별 삭제 중 오류 발생:", error);
    }
  };

  return (
    <>
      <ModalContent>
        <Item onClick={() => handleEdit(memoryId)}>수정</Item>
        <Line />
        <Item onClick={() => handleDelete(memoryId)}>삭제</Item>
      </ModalContent>
    </>
  );
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background: #101827;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 5px;
  color: #fff;
  z-index: 1000;
  position: absolute;
  right: -80px;
  top: 10px;
`;

const Item = styled.div`
  cursor: pointer;
  padding: 13px 24px;

  &:hover {
    background-color: #ece6f0;
  }
`;

const Line = styled.hr`
  height: 1px;
  border: none;
  background-color: rgba(255, 255, 255, 0.28);
`;
export default EditOrDeleteModal;
