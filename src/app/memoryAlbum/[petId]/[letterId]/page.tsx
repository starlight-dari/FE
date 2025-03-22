"use client";

import { useParams, useRouter } from "next/navigation";
import LetterDetail from "../../../../components/memoryAlbumDetail";

export default function Page() {
  const router = useRouter();
  const params = useParams();

  const petId = Number(params.petId);
  const letterId = Number(params.letterId);

  return <LetterDetail petId={petId} letterId={letterId} />;
}
