import React, { useState } from "react";
import styled from "styled-components";
import comment from "/public/comment.svg";
import heart from "/public/heart.svg";
import heart_filled from "/public/heart_filled.svg";
import X from "/public/X.svg";
import Image from "next/image";

const StarPage: React.FC = () => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([
    "이 게시물이 너무 좋습니다..",
    "정말 감동적인 글이에요..",
    "고양이가 너무 귀여워요><",
  ]);
  const [newComment, setNewComment] = useState("");
  const [postImage, setPostImage] = useState(
    "data:image/jpeg;base64,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"
  ); // 게시물 이미지 URL

  const handleLike = () => {
    setLikes(likes + 1); // 임시로 지정
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <ModalOverlay>
      <XButton>
        <Image src={X} alt="X" />
      </XButton>
      <ModalContent>
        <div>
          <PostImage src={postImage} alt="Post Image" />
          <Title>콩이와 처음 산책한 날</Title>
          <InfoContainer>
            <div style={{ display: "flex", gap: "10px" }}>
              <Category>쉬는 시간</Category>
              <Category>행복</Category>
            </div>
            <div style={{ position: "relative", right: "3px" }}>
              <span>2025년 3월 16일 15:04</span>
              <span>(수정됨)</span>
            </div>
          </InfoContainer>
          <Content>콩이랑 산책했다 🌌✨</Content>
          <AuthorName>콩이엄마</AuthorName>
        </div>
        <div style={{ paddingLeft: "40px", width: "650px" }}>
          <StateWrapper>
            <LikeState>
              <LikeButton onClick={handleLike}>
                <Image src={heart} alt="like" />
              </LikeButton>
              {likes}
            </LikeState>
            <CommentState>
              <Image src={comment} alt="comment" />5
            </CommentState>
          </StateWrapper>
          <CommentSection>
            <CommentWrapper>
              {comments.map((comment, index) => (
                <Comment key={index}>{comment}</Comment>
              ))}
            </CommentWrapper>
            <CommentInputContainer>
              <CommentInput
                type="text"
                placeholder="댓글을 입력하세요..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <SubmitButton onClick={handleAddComment}>등록</SubmitButton>
            </CommentInputContainer>
          </CommentSection>
        </div>
      </ModalContent>
    </ModalOverlay>
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
  z-index: 1000;
`;

const ModalContent = styled.div`
  display: flex;
  position: relative;
  background: #101827;
  width: 1200px;
  height: 900px;
  padding: 40px 30px;
  color: #fff;
  //   overflow: auto;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  letter-spacing: 1px;
  //   color: #a1cfff;
  //   text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
`;

const AuthorName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  //   color: #a1cfff;
  margin-bottom: 15px;
`;

// 이미지 스타일
const PostImage = styled.img`
  width: 512px;
  max-height: 512px;
  object-fit: cover;
  margin: 20px 0;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
`;

// 날짜/시간, 카테고리 스타일
const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 1.1rem;
  color: #dcdcdc;
  position: relative;
`;

const Category = styled.span`
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  padding: 10px 20px;
  color: #a1cfff;
  font-size: 1.2rem;
  border-radius: 100px;
`;

const Content = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 20px 0;
  color: #c0c0c0;
`;

// 댓글 섹션 스타일
const CommentSection = styled.div`
  margin-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 15px;
  position: relative;
  height: 830px;
`;

const CommentWrapper = styled.div`
  overflow-y: auto;
  height: 770px;
`;

// 댓글 목록 스타일
const Comment = styled.div`
  margin-bottom: 10px;
  font-size: 1rem;
  color: #dcdcdc;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
`;

// 댓글 입력창 스타일
const CommentInputContainer = styled.div`
  width: 650px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 10px;
  position: absolute;
  bottom: 10px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  outline: none;

  &::placeholder {
    color: #ccc;
    font-family: "Pretendard-Regular", sans-serif;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  background: #a1cfff;
  color: black;
  font-size: 1rem;
  cursor: pointer;
  font-family: "Pretendard-Regular", sans-serif;

  &:hover {
    background: #82b3ff;
  }
`;

const StateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const LikeState = styled.div`
  display: flex;
  align-items: center;
  font-size: 26px;
  gap: 5px;
`;

const CommentState = styled.div`
  display: flex;
  align-items: center;
  font-size: 26px;
  gap: 5px;
`;

const LikeButton = styled.button`
  border: none;
  cursor: pointer;
  background: none;
`;

const XButton = styled(LikeButton)`
  position: fixed;
  top: 10px;
  right: 10px;
`;

export default StarPage;
