"use client";

import Image from "next/image";
import React, { useMemo, useState, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";

const PulsatingStars = () => {
  const [clickedStar, setClickedStar] = useState(null); // 클릭된 별을 저장
  const { positions, sizes } = useMemo(() => {
    const tempPositions = [
      [356, 125],
      [338, 129],
      [313, 130],
      [300, 134],
      [289, 138],
      [280, 144],
      [268, 152],
      [257, 165],
      [247, 174],
      [243, 181],
      [232, 194],
      [219, 188],
      [212, 184],
      [209, 188],
      [205, 196],
      [201, 208],
      [197, 224],
      [185, 235],
      [176, 248],
      [172, 257],
      [162, 292],
      [157, 303],
      [153, 317],
      [154, 335],
      [158, 342],
      [162, 350],
      [167, 360],
      [171, 370],
      [177, 377],
      [185, 380],
      [193, 393],
      [204, 399],
      [215, 402],
      [225, 407],
      [245, 410],
      [262, 412],
      [275, 415],
      [289, 409],
      [295, 403],
      [303, 398],
      [312, 389],
      [319, 384],
      [319, 378],
      [328, 374],
      [339, 377],
      [347, 370],
      [355, 357],
      [363, 346],
      [367, 337],
      [373, 327],
      [377, 321],
      [383, 310],
      [391, 302],
      [405, 286],
      [415, 271],
      [419, 263],
      [423, 253],
      [424, 242],
      [431, 230],
      [433, 216],
      [430, 195],
      [423, 180],
      [414, 170],
      [407, 160],
      [400, 153],
      [395, 147],
      [387, 137],
      [373, 131],
      [359, 125],
    ];

    // 범위 0~500 => -250하고 나누기 5해서 범위 -50~50으로 재지정
    for (let i = 0; i < tempPositions.length; i++) {
      tempPositions[i][0] = (tempPositions[i][0] - 250) / 5;
      tempPositions[i][1] = (tempPositions[i][1] - 250) / 5;
    }

    // z좌표 -50으로 임의 지정
    for (let i = 0; i < tempPositions.length; i++) {
      tempPositions[i].push(-50);
    }

    // 모든 별의 크기는 1로 고정
    const tempSizes = [];
    for (let i = 0; i < tempPositions.length; i++) {
      tempSizes.push(1);
    }

    // Float32Array는 평탄한(flat) 배열이어야 하므로 변환 작업
    const flatTempPositions = tempPositions.flat();

    return {
      positions: new Float32Array(flatTempPositions),
      sizes: new Float32Array(tempSizes),
    };
  }, []);

  // 클릭 이벤트
  const handleClick = (index) => {
    setClickedStar(index);
    console.log(`Star ${index} clicked!`);
  };

  return (
    <points>
      <bufferGeometry>
        {/* 별 위치 */}
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        {/* 별 크기 */}
        <bufferAttribute
          attach="attributes-customSize"
          array={sizes}
          count={sizes.length}
          itemSize={1}
        />
      </bufferGeometry>
      {/* 별처럼 보이는 점들 렌더링, 클릭 시 handleClick 호출 */}
      {positions &&
        positions.length > 0 &&
        Array.from({ length: positions.length / 3 }).map((_, index) => (
          <mesh
            key={index}
            position={[
              positions[index * 3], // x
              positions[index * 3 + 1], // y
              positions[index * 3 + 2], // z
            ]}
            onClick={() => handleClick(index)}
          >
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshBasicMaterial color="white" />
          </mesh>
        ))}
    </points>
  );
};

// const Zoom = () => {
//   const [ratio, setRatio] = useState(1);

//   const handleZoomIn = () => {
//     setRatio((prev) => Math.min(prev + 0.25, 3)); // 최대 배율 3으로 제한
//   };

//   const handleZoomOut = () => {
//     setRatio((prev) => Math.max(prev - 0.25, 0.5)); // 최소 배율 0.5로 제한
//   };

//   const resetZoom = () => {
//     setRatio(1); // 배율 초기화
//   };

//   return (
//     <div style={{ position: "relative" }}>
//       <button
//         onClick={handleZoomIn}
//         style={{ position: "absolute", top: 20, left: 20 }}
//       >
//         Zoom In
//       </button>
//       <button
//         onClick={handleZoomOut}
//         style={{ position: "absolute", top: 20, left: 100 }}
//       >
//         Zoom Out
//       </button>
//     </div>
//   );
// };

export default function Page() {
  return (
    <>
      <Canvas style={{ background: "black", height: "100vh" }}>
        <ambientLight />
        <PulsatingStars />
        {/* <Html>
          <CameraZoom />
        </Html> */}
      </Canvas>
    </>
  );
}
