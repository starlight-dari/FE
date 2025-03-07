import { useRouter } from "next/router";

export default function LetterDetail() {
  const router = useRouter();
  const { albumId, letterId } = router.query;

  return (
    <div>
      <h1>
        앨범 {albumId} - 편지 {letterId} 상세 내용
      </h1>
      <p>여기에 편지 내용을 표시합니다.</p>
      <button onClick={() => router.push(`/memoryAlbum/${albumId}`)}>
        뒤로 가기
      </button>
    </div>
  );
}
