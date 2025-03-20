"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Logo from "/public/starlight-logo-horizontal.png";
import Menu from "/public/menu.svg";
import styled from "styled-components";
import NavBar from "./navBar";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Container>
      <Image
        src={Logo}
        alt="별빛다리"
        width={240}
        style={{ cursor: "pointer" }}
        onClick={() => router.push(`/mypage/myInfo`)}
      />
      <Button onClick={() => setIsOpen(!isOpen)}>
        <Image src={Menu} alt="메뉴" />
      </Button>
      <NavBar isOpen={isOpen} navRef={navRef} />
    </Container>
  );
};

export default Header;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 90px;
`;

const Button = styled.button`
  border: none;
  position: absolute;
  right: 20px;
  background: transparent;
  cursor: pointer;
`;
