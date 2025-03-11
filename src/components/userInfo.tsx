"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";

import edit from "/public/edit.svg";
import axios from "axios";

interface UserData {
  email: string;
  kk_nickname: string;
  memory_num: number;
  profile_img: string;
  st_nickname: string;
}

const UserInfo = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(true);

  const getUserInfo = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://3.37.55.176:8080/member`,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      console.log("서버 응답:", response);

      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("유저 정보 요청 중 오류 발생:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (userData && userData.st_nickname) {
      setNickname(userData.st_nickname);
    }
  }, [userData]);

  const handleNicknameChange = (e: any) => {
    setNickname(e.target.value);
  };

  const editUserNickname = () => {
    setIsEditingNickname(true);
  };

  const saveUserNickname = async () => {
    try {
      const response = await axios({
        method: "PUT",
        url: `http://3.37.55.176:8080/member/name`,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        data: {
          nickname: nickname,
        },
      });

      console.log("서버 응답:", response);
    } catch (error) {
      console.error("유저 닉네임 수정 중 오류 발생:", error);
    }
    setIsEditingNickname(false);
    await getUserInfo();
  };

  if (loading) {
    return <h1>로그인 중입니다...</h1>;
  }

  if (!userData) {
    return <h1>로그인에 실패하였습니다.</h1>;
  }

  return (
    <Container>
      <UserImage src={userData.profile_img} alt="user photo" />
      <UserWrapper>
        <UserDetail>
          <User>
            <UserName>{userData.kk_nickname}</UserName>
            <span>님</span>
          </User>
          <UserEmail>{userData.email}</UserEmail>
        </UserDetail>
        {isEditingNickname ? (
          <UserNickName>
            닉네임: <Input value={nickname} onChange={handleNicknameChange} />
            <EditButton onClick={saveUserNickname}>
              {/* <Image src={edit} alt="edit" width={12} height={12} /> */}
              저장
            </EditButton>
          </UserNickName>
        ) : (
          <UserNickName>
            닉네임: {userData.st_nickname}
            <EditButton onClick={editUserNickname}>
              {/* <Image src={edit} alt="edit" width={12} height={12} /> */}
              수정
            </EditButton>
          </UserNickName>
        )}
      </UserWrapper>
      <MemoryStar>추억별 {userData.memory_num}</MemoryStar>
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

const Input = styled.input`
  font-family: "Pretendard-Regular", sans-serif;
  border: none;
  outline: none;
  padding: 3px 5px;
  width: 70px;
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;
  font-family: "Pretendard-Regular", sans-serif;
  color: black;
  background: #fff;
  padding: 3px 5px;
  border-radius: 5px;
`;

const MemoryStar = styled.div`
  position: absolute;
  right: 100px;
`;

export default UserInfo;
