"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import axios from "axios";

interface AlbumData {
  petId: number;
  petName: string;
  imgUrl: string;
  albumStarted: boolean;
  arrived: boolean;
  arrivedCount: number;
}

interface PetAlbumContent {
  letter_id: number;
  pet_id: number;
  title: string;
  content: string;
  createdAt: string;
  opened: boolean;
}

interface LetterDetail {
  letter_id: number;
  pet_id: number;
  title: string;
  content: string;
  createdAt: string;
  opened: boolean;
  images: string[];
}

interface AlbumContextType {
  albumData: AlbumData[] | null;
  selectedPet: AlbumData | null;
  petAlbumContent: PetAlbumContent[] | null;
  letterDetail: LetterDetail | null;
  fetchPetList: (petId: number | null) => void;
  fetchLetterDetail: (letterId: number) => void;
}

const AlbumContext = createContext<AlbumContextType | undefined>(undefined);

export const AlbumProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  const [albumData, setAlbumData] = useState<AlbumData[] | null>(null);
  const [selectedPet, setSelectedPet] = useState<AlbumData | null>(null);
  const [petAlbumContent, setPetAlbumContent] = useState<
    PetAlbumContent[] | null
  >(null);
  const [letterDetail, setLetterDetail] = useState<LetterDetail | null>(null);

  const fetchPetList = useCallback(
    async (petId: number | null) => {
      try {
        const response = await axios.get(
          `http://${server_url}:8080/memory-album/status`,
          { withCredentials: true }
        );
        setAlbumData(response.data);
        if (petId !== null) {
          const petInfo = response.data.find(
            (pet: AlbumData) => pet.petId === petId
          );
          setSelectedPet(petInfo || null);
        }
      } catch (error) {
        console.error("앨범 데이터 가져오기 실패:", error);
      }
    },
    [server_url]
  );

  const fetchPetAlbum = async (petId: number) => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://${server_url}:8080/memory-album/pet/${petId}`,
        withCredentials: true,
      });

      console.log("서버 응답:", response);
      setPetAlbumContent(response.data);
    } catch (error) {
      console.error("추억 앨범 요청 중 오류 발생:", error);
    }
  };

  const fetchLetterDetail = async (letterId: number) => {
    try {
      const response = await axios.get(
        `http://${server_url}:8080/memory-album/letter/${letterId}`,
        { withCredentials: true }
      );
      setLetterDetail(response.data);
      fetchPetList(null);
    } catch (error) {
      console.error("편지 상세 정보 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchPetList(null);
  }, [fetchPetList]);

  useEffect(() => {
    if (selectedPet) {
      fetchPetAlbum(selectedPet.petId);
    }
  }, [selectedPet, fetchPetList]);

  return (
    <AlbumContext.Provider
      value={{
        albumData,
        selectedPet,
        petAlbumContent,
        letterDetail,
        fetchPetList,
        fetchLetterDetail,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
};

export const useAlbum = () => {
  const context = useContext(AlbumContext);
  if (!context)
    throw new Error("useAlbum must be used within an AlbumProvider");
  return context;
};
