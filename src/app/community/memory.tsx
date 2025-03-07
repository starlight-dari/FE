"use client";

import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const MemoryPage = () => {
  const router = useRouter();

  return (
    <>
      <div>
        <span>다른 별빛들의 추억들을 둘러보세요.</span>
      </div>
    </>
  );
};

export default MemoryPage;
