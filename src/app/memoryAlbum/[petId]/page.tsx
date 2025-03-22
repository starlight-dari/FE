"use client";

import styled from "styled-components";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import AlbumContent from "../../../components/memoryAlbumContent";

const PetAlbumPage = () => {
  const router = useRouter();
  const params = useParams();

  const petId = Number(params.petId);

  return <AlbumContent petId={petId} />;
};

export default PetAlbumPage;
