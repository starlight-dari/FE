"use client";

import Image from "next/image";
import React from "react";
import Logo from "/public/starlight-logo-horizontal.png";
import Menu from "/public/menu.svg";
import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <Image src={Logo} alt="별빛다리" width={170} />
      <Button>
        <Image src={Menu} alt="메뉴" />
      </Button>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 65px;
  border-bottom: 1px solid #fff;
`;

const Button = styled.button`
  border: none;
  position: absolute;
  right: 20px;
  background: transparent;
  cursor: pointer;
`;
