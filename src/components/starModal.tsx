import React, { useEffect, useState } from "react";
import styled from "styled-components";
import comment from "/public/comment.svg";
import heart from "/public/heart.svg";
import heart_filled from "/public/heart_filled.svg";
import more from "/public/more.svg";
import X from "/public/X.svg";
import Image from "next/image";
import axios from "axios";
import EditOrDeleteModal from "./editOrDeleteModal";

interface StarPageData {
  memory_id: number;
  star_id: number;
  writer_id: number;
  writer_name: string;
  name: string;
  activityCtg: string;
  emotionCtg: string;
  content: string;
  updatedAt: string;
  shared: boolean;
  updated: boolean;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
  img_url: string;
}

interface CommentData {
  comment_id: number;
  memory_id: number;
  content: string;
  writer_id: number;
  writer_name: string;
}

interface StarPageModalProps {
  onClose: () => void;
  memoryId: number;
}

const ActivityMap: Record<string, string> = {
  WALK: "산책",
  PLAY: "놀이",
  TRAINING: "훈련",
  FOOD: "먹이/간식",
  HOSPITAL: "병원",
  GROOMING: "목욕/미용",
  TRAVEL: "여행",
  ANNIVERSARY: "기념일",
  RELAX: "쉬는 시간",
};

const EmotionMap: Record<string, string> = {
  HAPPY: "행복",
  TOUCHED: "감동",
  PEACEFUL: "안정/평화",
  SAD: "슬픔",
  GRATEFUL: "감사",
  SURPRISED: "놀람",
  REGRET: "아쉬움",
  LOVE: "사랑",
  EXPECTATION: "기대감",
};

const StarPage: React.FC<StarPageModalProps> = ({ onClose, memoryId }) => {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

  const [loginUserId, setLoginUserId] = useState(0);
  const [starPage, setStarPage] = useState<StarPageData | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isCommentEditing, setIsCommentEditing] = useState<
    Record<number, boolean>
  >({});
  const [editText, setEditText] = useState<Record<number, string>>({});
  const [isVisible, setIsVisible] = useState(false);
  const [moreModalVisible, setMoreModalVisible] = useState(false);

  const getLoginUserId = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://${server_url}:8080/member/logined`,
        withCredentials: true,
      });

      console.log("서버 응답:", response);
      setLoginUserId(response.data);
    } catch (error) {
      console.error("로그인된 유저 정보 요청 중 오류 발생:", error);
    }
  };

  const getStarInfo = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://${server_url}:8080/memory-stars/${memoryId}`,
        withCredentials: true,
      });

      console.log("서버 응답:", response);
      setStarPage(response.data.memoryStarRepDto);
      setComments(response.data.memComments);
    } catch (error) {
      console.error("별 기록 요청 중 오류 발생:", error);
    }
  };

  const openMoreModal = () => {
    setMoreModalVisible(true);
  };

  const closeMoreModal = () => {
    setMoreModalVisible(false);
  };

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 500); // 0.5초 후 모달 띄우기
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // 0.3초 후 모달 닫기
  };

  const handleLike = (isLiked: boolean) => {
    if (isLiked) {
      cancelLike();
    } else {
      addLike();
    }
  };

  const addLike = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: `http://${server_url}:8080/memory-stars/${memoryId}/likes`,
        withCredentials: true,
      });

      console.log("서버 응답:", response);
      getStarInfo();
    } catch (error) {
      console.error("좋아요 클릭 중 오류 발생:", error);
    }
  };

  const cancelLike = async () => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `http://${server_url}:8080/memory-stars/${memoryId}/likes`,
        withCredentials: true,
      });

      console.log("서버 응답:", response);
      getStarInfo();
    } catch (error) {
      console.error("좋아요 취소 중 오류 발생:", error);
    }
  };

  const addComment = async (content: string) => {
    try {
      const response = await axios({
        method: "POST",
        url: `http://${server_url}:8080/memory-stars/comment`,
        withCredentials: true,
        data: {
          content: content,
          memory_id: memoryId,
        },
      });

      console.log("서버 응답:", response);
      fetchComments(memoryId);
      getStarInfo();
    } catch (error) {
      console.error("댓글 작성 중 오류 발생:", error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleAddComment();
    }
  };

  const fetchComments = async (memoryId: number) => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://${server_url}:8080/memory-stars/${memoryId}/comments`,
        withCredentials: true,
      });
      console.log("서버 응답:", response);
      setComments(response.data);
    } catch (error) {
      console.error("댓글 조회 중 오류 발생:", error);
    }
  };

  const editComment = (commentId: number, content: string) => {
    setIsCommentEditing((prev) => ({ ...prev, [commentId]: true }));
    setEditText((prev) => ({ ...prev, [commentId]: content })); // 기존 댓글 내용 세팅
  };

  const saveComment = async (commentId: number) => {
    try {
      const response = await axios({
        method: "PUT",
        url: `http://${server_url}:8080/memory-stars/comment`,
        withCredentials: true,
        data: {
          content: editText[commentId],
          comment_id: commentId,
        },
      });

      console.log("서버 응답:", response);
      alert("댓글이 수정되었습니다.");
      setIsCommentEditing((prev) => ({ ...prev, [commentId]: false }));
      fetchComments(memoryId);
    } catch (error) {
      console.error("댓글 수정 중 오류 발생:", error);
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `http://${server_url}:8080/memory-stars/comment/${commentId}`,
        withCredentials: true,
      });

      console.log("서버 응답:", response);
      alert("댓글이 삭제되었습니다.");
      fetchComments(memoryId);
      getStarInfo();
    } catch (error) {
      console.error("댓글 삭제 중 오류 발생:", error);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      addComment(newComment);
      setNewComment("");
    }
  };

  useEffect(() => {
    getStarInfo();
    getLoginUserId();
  }, []);

  if (!starPage) return null;

  return (
    <ModalOverlay isVisible={isVisible}>
      <XButton onClick={handleClose}>
        <Image src={X} alt="X" />
      </XButton>
      <ModalContent>
        <div style={{ width: "500px" }}>
          <PostImage
            src={starPage.img_url}
            alt="Post Image"
            width={500}
            height={500}
          />
          <Title>{starPage.name}</Title>
          <InfoContainer>
            <div style={{ display: "flex", gap: "10px" }}>
              <Category>{ActivityMap[starPage.activityCtg]}</Category>
              <Category>{EmotionMap[starPage.emotionCtg]}</Category>
            </div>
            <div style={{ position: "relative", right: "3px" }}>
              <span>{starPage.updatedAt}</span>
              {starPage.updated && <span>(수정됨)</span>}
            </div>
          </InfoContainer>
          <Content>{starPage.content}</Content>
          <AuthorName>{starPage.writer_name}</AuthorName>
        </div>
        <div style={{ paddingLeft: "40px", width: "560px" }}>
          <StateWrapper>
            <LikeState>
              <LikeButton onClick={() => handleLike(starPage.isLiked)}>
                {starPage.isLiked ? (
                  <Image src={heart_filled} alt="like" />
                ) : (
                  <Image src={heart} alt="like" />
                )}
              </LikeButton>
              {starPage.likes}
            </LikeState>
            <CommentState>
              <Image src={comment} alt="comment" />
              {starPage.commentNumber}
            </CommentState>
            {loginUserId === starPage.writer_id && (
              <MoreButton onClick={openMoreModal}>
                <Image src={more} alt="more" />
              </MoreButton>
            )}
            {moreModalVisible && (
              <EditOrDeleteModal
                memoryId={starPage.memory_id}
                onClose={closeMoreModal}
              />
            )}
          </StateWrapper>
          <CommentSection>
            <CommentWrapper>
              {comments.map((comment) => (
                <Comment key={comment.comment_id}>
                  {isCommentEditing[comment.comment_id] ? (
                    <>
                      <p style={{ fontWeight: "600", color: "#adc3f3" }}>
                        {comment.writer_name}
                      </p>
                      <EdittingCommentInput
                        type="text"
                        value={editText[comment.comment_id] || ""}
                        onChange={(e) =>
                          setEditText((prev) => ({
                            ...prev,
                            [comment.comment_id]: e.target.value,
                          }))
                        }
                      />
                      <EditButton
                        onClick={() => {
                          saveComment(comment.comment_id);
                        }}
                      >
                        수정 확인
                      </EditButton>
                      <DeleteButton
                        onClick={() =>
                          setIsCommentEditing((prev) => ({
                            ...prev,
                            [comment.comment_id]: false,
                          }))
                        }
                      >
                        취소
                      </DeleteButton>
                    </>
                  ) : (
                    <>
                      <p style={{ fontWeight: "600", color: "#adc3f3" }}>
                        {comment.writer_name}
                      </p>
                      <p style={{ padding: "4.4px 0" }}>{comment.content}</p>
                      {loginUserId === comment.writer_id && (
                        <>
                          <EditButton
                            onClick={() =>
                              editComment(comment.comment_id, comment.content)
                            }
                          >
                            수정
                          </EditButton>
                          <DeleteButton
                            onClick={() => deleteComment(comment.comment_id)}
                          >
                            삭제
                          </DeleteButton>
                        </>
                      )}
                    </>
                  )}
                </Comment>
              ))}
            </CommentWrapper>
            <CommentInputContainer>
              <CommentInput
                type="text"
                placeholder="댓글을 입력하세요..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <SubmitButton onClick={handleAddComment}>등록</SubmitButton>
            </CommentInputContainer>
          </CommentSection>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div<{ isVisible: boolean }>`
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
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  transform: translateY(${(props) => (props.isVisible ? "0" : "-20px")});
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: ${(props) => (props.isVisible ? "auto" : "none")};
`;

const ModalContent = styled.div`
  display: flex;
  position: relative;
  background: #101827;
  width: 1100px;
  height: 800px;
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
`;

const PostImage = styled(Image)`
  object-fit: cover;
  margin-bottom: 20px;
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
  height: 112px;
  overflow-y: auto;
`;

// 댓글 섹션 스타일
const CommentSection = styled.div`
  margin-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 15px;
  position: relative;
  height: 708px;
`;

const CommentWrapper = styled.div`
  overflow-y: auto;
  height: 770px;
`;

// 댓글 목록 스타일
const Comment = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  font-size: 1rem;
  color: #dcdcdc;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  gap: 10px;
  position: relative;
`;

// 댓글 입력창 스타일
const CommentInputContainer = styled.div`
  width: 560px;
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
  position: relative;
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

const MoreButton = styled(LikeButton)`
  position: absolute;
  right: 7px;
`;

const DeleteButton = styled(LikeButton)`
  position: absolute;
  right: 18px;
  color: #fff;
`;

const EditButton = styled(LikeButton)`
  position: absolute;
  right: 57px;
  color: #fff;
`;

const XButton = styled(LikeButton)`
  position: fixed;
  top: 10px;
  right: 10px;
`;

const EdittingCommentInput = styled.input`
  width: 588px;
  padding: 6px 10px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  outline: none;

  &::placeholder {
    color: #ccc;
    font-family: "Pretendard-Regular", sans-serif;
  }
`;

export default StarPage;
