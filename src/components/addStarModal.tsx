"use client";

import styled from "styled-components";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import StarImageUpload from "./starImageUpload";
import axios from "axios";
import { useParams } from "next/navigation";

export interface StarFormData {
  star_id: number;
  name: string;
  pet_id: number;
  activityCtg: string;
  emotionCtg: string;
  content: string;
  img_url: File | null;
  isAnimal: boolean;
  shared: boolean;
}

interface AddStarModalProps {
  onClose: () => void;
  starId: number | null;
}

const ACTIVIY_OPTIONS = [
  "산책",
  "놀이",
  "훈련",
  "먹이/간식",
  "병원",
  "목욕/미용",
  "여행",
  "기념일",
  "쉬는 시간",
];

const EMOTION_OPTIONS = [
  "행복",
  "감동",
  "안정/평화",
  "슬픔",
  "감사",
  "놀람",
  "아쉬움",
  "사랑",
  "기대감",
];

const AddStarModal: React.FC<AddStarModalProps> = ({ onClose, starId }) => {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  const params = useParams();
  const petId = Number(params.petId);

  const modalRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<StarFormData>({
    star_id: starId || 0,
    name: "",
    pet_id: petId || 0,
    activityCtg: "",
    emotionCtg: "",
    content: "",
    img_url: null,
    isAnimal: true,
    shared: false,
  });
  const [image, setImage] = useState<string | null>(null);

  const [activitySelected, setActivitySelected] = useState("상황");

  const [emotionSelected, setEmotionSelected] = useState("감정");

  const handleActivitySelect = (option: string) => {
    const ActivityMap: Record<string, string> = {
      산책: "WALK",
      놀이: "PLAY",
      훈련: "TRAINING",
      "먹이/간식": "FOOD",
      병원: "HOSPITAL",
      "목욕/미용": "GROOMING",
      여행: "TRAVEL",
      기념일: "ANNIVERSARY",
      "쉬는 시간": "RELAX",
    };
    setActivitySelected(option);

    setFormData((prev: StarFormData) => ({
      ...prev,
      activityCtg: ActivityMap[option],
    }));
  };

  const handleEmotionSelect = (option: string) => {
    const EmotionMap: Record<string, string> = {
      행복: "HAPPY",
      감동: "TOUCHED",
      "안정/평화": "PEACEFUL",
      슬픔: "SAD",
      감사: "GRATEFUL",
      놀람: "SURPRISED",
      아쉬움: "REGRET",
      사랑: "LOVE",
      기대감: "EXPECTATION",
    };
    setEmotionSelected(option);

    setFormData((prev: StarFormData) => ({
      ...prev,
      emotionCtg: EmotionMap[option],
    }));
  };

  // formData 업데이트
  useEffect(() => {
    if (starId !== null) {
      setFormData((prev) => ({
        ...prev,
        star_id: starId, // 선택된 star_id로 업데이트
      }));
    }
  }, [starId]);

  const isFormValid = useMemo((): boolean => {
    return (
      formData.img_url !== null &&
      formData.name?.trim() !== "" &&
      !!formData.activityCtg?.trim() &&
      !!formData.emotionCtg?.trim() &&
      formData.content?.trim() !== ""
    );
  }, [formData]); // formData가 변경될 때마다 isFormValid 함수가 새로 생성됨

  useEffect(() => {
    console.log(formData);
  }, [formData, isFormValid]); // formData가 변경될 때마다 유효성 검사 실행

  const handleCancel = () => {
    if (
      confirm("이대로 취소하면 적으신 내용은 저장되지 않아요. 취소하시겠어요?")
    ) {
      onClose();
    } else {
      console.log("그대로 작성 유지");
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();

      // 파일 및 데이터 추가
      if (formData.img_url) {
        data.append("img_url", formData.img_url);
      }
      data.append("star_id", String(formData.star_id));
      data.append("name", formData.name);
      data.append("pet_id", String(formData.pet_id));
      data.append("activityCtg", formData.activityCtg);
      data.append("emotionCtg", formData.emotionCtg);
      data.append("content", formData.content);
      data.append("isAnimal", String(formData.isAnimal));
      data.append("shared", String(formData.shared));

      console.log("POST할 별 Data:", data);

      const response = await axios({
        method: "POST",
        url: `http://${server_url}:8080/memory-stars`,
        withCredentials: true,
        data: data,
      });

      console.log("서버 응답:", response);
      console.log("신규 별을 생성했습니다.");
      alert("신규 별을 생성했습니다.");
    } catch (error) {
      console.error("신규 별 기록 중 오류 발생:", error);
    }
    onClose();
  };

  if (starId === null) return null;

  return (
    <>
      <ModalOverlay>
        <ModalContent ref={modalRef} onClick={(e) => e.stopPropagation()}>
          <StarImageUpload
            formData={formData}
            setFormData={setFormData}
            setImage={setImage}
          />
          <ModalBody>
            <ItemWrapper>
              <Title>#{starId} 별에 추억 기록하기</Title>
              <Input
                placeholder="새로운 별의 이름을 적어주세요."
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <Item>
                <Label>어떤 상황이었나요? 어떤 감정을 느꼈나요?</Label>
                <Select
                  value={activitySelected}
                  onChange={(e) => handleActivitySelect(e.target.value)}
                >
                  <option>상황 선택</option>
                  {ACTIVIY_OPTIONS.map((activity) => (
                    <option key={activity} value={activity}>
                      {activity}
                    </option>
                  ))}
                </Select>
                <Select
                  value={emotionSelected}
                  onChange={(e) => handleEmotionSelect(e.target.value)}
                >
                  <option>감정 선택</option>
                  {EMOTION_OPTIONS.map((emotion) => (
                    <option key={emotion} value={emotion}>
                      {emotion}
                    </option>
                  ))}
                </Select>
              </Item>
              <Item>
                <Textarea
                  placeholder={`어떤 일이 있었는지 적어주세요.\n자세히 적어주실수록, 더 정확한 내용의 편지를 받아보실 수 있어요!`}
                  value={formData.content}
                  onChange={(e) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                />
              </Item>
              <Item>
                <RadioButtonWrapper htmlFor="petPhoto">
                  <RadioButton
                    type="radio"
                    name="photoType"
                    id="petPhoto"
                    value="true"
                    checked={formData.isAnimal}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        isAnimal: true,
                      }))
                    }
                  />
                  <span>반려동물의 사진이에요</span>
                </RadioButtonWrapper>
                <RadioButtonWrapper htmlFor="notPetPhoto">
                  <RadioButton
                    type="radio"
                    name="photoType"
                    id="notPetPhoto"
                    value="false"
                    checked={!formData.isAnimal}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        isAnimal: false,
                      }))
                    }
                  />
                  <span>반려동물의 사진이 아니에요(풍경, 사물 등)</span>
                </RadioButtonWrapper>
              </Item>
              <ToggleWrapper>
                <Label>별빛 저장소에 별 공개하기</Label>
                <ToggleSwitch>
                  <ToggleInput
                    type="checkbox"
                    id="toggle"
                    checked={formData.shared}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        shared: !prev.shared,
                      }))
                    }
                  />
                  <ToggleLabel htmlFor="toggle" />
                </ToggleSwitch>
              </ToggleWrapper>
            </ItemWrapper>
          </ModalBody>
          <Button onClick={handleCancel}>별 생성 취소하기</Button>
          <SubmitButton onClick={handleSubmit} disabled={!isFormValid}>
            새로운 별 생성하기
          </SubmitButton>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  background: linear-gradient(to bottom, #23242b 0%, #0c172a 100%);
  height: 600px;
  padding: 40px 30px;
  color: #fff;
  border-radius: 10px;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
`;

const ItemWrapper = styled.div`
  margin-left: 38px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const Title = styled.div`
  font-weight: 900;
  font-size: 20px;
`;

const Label = styled.div`
  font-weight: 600;
`;

const Input = styled.input`
  width: 500px;
  padding: 10px;
  border: none;
  outline: none;
  background: #292e3a;
  color: #fff;
  font-family: "Pretendard-Regular", sans-serif; /* placeholder 글씨체 적용 */

  &::placeholder {
    font-family: "Pretendard-Regular", sans-serif; /* placeholder 글씨체 적용 */
    font-size: 14px;
    color: #999;
  }
`;

const Button = styled.button`
  width: 146px;
  height: 40px;
  border: 1px solid #adc3f3;
  border-radius: 5px;
  background: transparent;
  color: #adc3f3;
  cursor: pointer;
  position: absolute;
  bottom: 25px;
  right: 190px;
  font-family: "Pretendard-Regular", sans-serif;
`;

const SubmitButton = styled(Button)<{ disabled: boolean }>`
  border: ${({ disabled }) => (disabled ? "1px solid #d9d9d98c" : "none")};
  background: ${({ disabled }) => (disabled ? "transparent" : "#ADC3F3")};
  color: ${({ disabled }) => (disabled ? "#d9d9d98c" : "#101829;")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  right: 34px;
`;

const ToggleSwitch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* 기존의 checkbox 버튼 숨기기 */
const ToggleInput = styled.input`
  display: none;
`;

/* 토글 스타일 지정 */
const ToggleLabel = styled.label`
  position: relative;
  display: block;
  width: 40px;
  height: 24px;
  background-color: #ccc;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s ease;
  }

  /* 토글 ON 스타일 적용 */
  ${ToggleInput}:checked + & {
    background-color: #adc3f3;
  }

  /* 토글 ON인 경우 버튼 이동 */
  ${ToggleInput}:checked + &::before {
    transform: translateX(16px);
  }
`;

const ToggleWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Textarea = styled.textarea`
  width: 500px;
  height: 150px;
  border: none;
  background: #292e3a;
  color: #fff;
  font-family: "Pretendard-Regular", sans-serif; /* placeholder 글씨체 적용 */
  padding: 10px;
  resize: none;
  outline: none;

  &::placeholder {
    font-family: "Pretendard-Regular", sans-serif; /* placeholder 글씨체 적용 */
    font-size: 14px;
    color: #999;
  }
`;

const RadioButton = styled.input`
  -webkit-appearance: none; /* 웹킷 브라우저에서 기본 스타일 제거*/
  -moz-appearance: none; /* 모질라 브라우저에서 기본 스타일 제거*/
  appearance: none; /*기본 브라우저에서 기본 스타일 제거*/
  width: 13px;
  height: 13px;
  border: 1px solid #ccc;
  border-radius: 100%;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: #adc3f3; /*체크 시 내부 원 색상*/
    border: 3px solid #fff; /*라인이 아닌, 라인과 원 사이 색상*/
    box-shadow: 0 0 0 1px #adc3f3; /*라인*/
  }
`;

const RadioButtonWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 5px 10px;

  &:hover {
    color: #adc3f3;
    cursor: pointer;
  }
`;
const Select = styled.select`
  padding: 10px;
  border: 1px solid #374151;
  border-radius: 5px;
  background: #1f2937;
  color: white;
  font-size: 14px;
  width: 100%;
`;

export default AddStarModal;
