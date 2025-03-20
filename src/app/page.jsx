"use client";

import Image from "next/image";
import React, { useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { Html, shaderMaterial } from "@react-three/drei";
import KakaoLoginButton from "../components/kakaoLoginButton";

// Custom Shader Material for scaling points
const PulsatingShaderMaterial = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color("white") },
  // Vertex Shader
  `
  attribute float customSize;
  uniform float uTime;

  void main() {
    // 크기 변화: 1.0 ~ 1.5 배
    float scale = 1.0 + 0.5 * sin(uTime * 2.0);
    gl_PointSize = customSize * scale; // 점 크기 조정
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  `
  uniform vec3 uColor;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    if (length(coord) > 0.5) discard; // 원형 점
    gl_FragColor = vec4(uColor, 1.0); // 흰색
  }
  `
);

extend({ PulsatingShaderMaterial });

const PulsatingStars = () => {
  const { positions, sizes } = useMemo(() => {
    const tempPositions = [];
    const tempSizes = [];
    for (let i = 0; i < 1000; i++) {
      tempPositions.push(
        (Math.random() - 0.5) * 100, // x
        (Math.random() - 0.5) * 100, // y
        (Math.random() - 0.5) * 100 // z
      );
      tempSizes.push(Math.random() * 3 + 0.1); // 크기: 2 ~ 7 사이
    }
    return {
      positions: new Float32Array(tempPositions),
      sizes: new Float32Array(tempSizes),
    };
  }, []);

  const materialRef = React.useRef();

  // Update time uniform in the shader
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.getElapsedTime();
    }
  });

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
      <pulsatingShaderMaterial ref={materialRef} uColor="white" />
    </points>
  );
};

export default function Home() {
  return (
    <>
      <Canvas style={{ height: "100vh" }}>
        <ambientLight />
        <PulsatingStars />
        <Html
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) scale(1)",
            transformOrigin: "0px 0px",
            zIndex: "16695054",
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
          }}
        >
          <img
            alt="logo"
            src="/starlight-logo.png"
            style={{ width: "250px" }}
          />
          <KakaoLoginButton />
        </Html>
      </Canvas>
    </>
  );
}
