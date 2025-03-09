// import "../globals.css";
import styled from "styled-components";
import React, { useState } from "react";
import Image from "next/image";
import chevron_up from "/public/chevron_up.svg";
import chevron_down from "/public/chevron_down.svg";

import MARU from "/public/maru.svg";
import KONG from "/public/kong.svg";

interface NavBarProps {
  isOpen: boolean;
  navRef: React.RefObject<HTMLDivElement | null>;
}

const NavBar = ({ isOpen, navRef }: NavBarProps) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  return (
    <Wrapper isOpen={isOpen} ref={navRef}>
      <Profile>
        <ProfilePhoto />
        <User>
          <UserName>백주영</UserName>
          <span>님</span>
        </User>
      </Profile>
      <MenuBar>
        <Menu>마이페이지</Menu>
        <Menu onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}>
          나의 별자리
          <ToggleButton>
            {isSubMenuOpen ? (
              <Image src={chevron_up} alt="chevron_up" />
            ) : (
              <Image src={chevron_down} alt="chevron_down" />
            )}
          </ToggleButton>
        </Menu>
        {isSubMenuOpen && (
          <SubMenu>
            <Item>
              <PetImage src={MARU} alt="" />
              마루자리
            </Item>
            <Item>
              <PetImage src={KONG} alt="" />
              콩이자리
            </Item>
          </SubMenu>
        )}
        <Menu>
          추억앨범
          <AlertBadge />
        </Menu>
        <Menu>커뮤니티</Menu>
      </MenuBar>
    </Wrapper>
  );
};

export default NavBar;

const Wrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  background: #f7f2fa;
  border-radius: 7px 0 0 7px;
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-282px")};
  width: 250px;
  height: 100vh;
  padding: 16px;
  transition: right 0.3s ease-in-out;
  box-shadow: ${({ isOpen }) =>
    isOpen ? "-4px 0 10px rgba(0, 0, 0, 0.2)" : "none"};
  z-index: 1000;

  // background: #19193c;
  // color: white;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 20px;
`;

const ProfilePhoto = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  background: red;
`;

const User = styled.div`
  display: flex;
  align-items: baseline;
  gap: 7px;
  font-size: 13px;
`;

const UserName = styled.span`
  font-weight: 900;
  font-size: 17px;
`;

const MenuBar = styled.div`
  display: flex;
  flex-direction: column;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0 20px 10px;
  font-weight: 900;
  font-size: 20px;
  cursor: pointer;
`;

const SubMenu = styled.div`
  border: 1px solid #d9d9d9;
  display: flex;
  flex-direction: column;
`;

const PetImage = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 100px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;

  &:hover {
    background-color: #ecd1fc61;
  }
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: none;
`;

const AlertBadge = styled.span``;
