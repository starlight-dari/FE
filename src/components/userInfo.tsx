"use client";

import React, { useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";

import JJONG from "/public/jjong.svg";
import edit from "/public/edit.svg";
import axios from "axios";

const UserInfo = () => {
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `http://3.37.55.176:8080/member/select`,
          withCredentials: true,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        });

        console.log("서버 응답:", response);
      } catch (error) {
        console.error("유저 정보 요청 중 오류 발생:", error);
      }
    };

    getUserInfo();
  }, []);

  return (
    <Container>
      <UserImage src={JJONG} alt="user photo" />
      <UserWrapper>
        <UserDetail>
          <User>
            <UserName>백주영</UserName>
            <span>님</span>
          </User>
          <UserEmail>example@domain.com</UserEmail>
        </UserDetail>
        <UserNickName>
          닉네임: 134435
          <EditButton>
            <Image src={edit} alt="edit" width={12} height={12} />
          </EditButton>
        </UserNickName>
      </UserWrapper>
      <MemoryStar>추억별 34</MemoryStar>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  width: calc(100vw - 360px);
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid #fff;
  position: relative;
`;

const UserImage = styled(Image)`
  width: 70px;
  height: 70px;
  border-radius: 100px;
`;

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const UserDetail = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const User = styled.div`
  display: flex;
  align-items: baseline;
  gap: 7px;
  font-size: 13px;
`;

const UserName = styled.span`
  font-weight: 900;
  font-size: 17px;
`;

const UserEmail = styled.div`
  color: #d9d9d9;
  font-size: 12px;
`;

const UserNickName = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  cursor: pointer;
`;

const MemoryStar = styled.div`
  position: absolute;
  right: 100px;
`;

export default UserInfo;
