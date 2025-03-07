import "../globals.css";
import styled from "styled-components";
import React from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 249px;
  background: #f7f2fa;
  border-radius: 7px 0 0 7px;
`;

const Profile = styled.div``;

const ProfilePhoto = styled.span``;

const UserName = styled.span``;

const MenuBar = styled.div``;

const Menu = styled.div``;

const ToggleButton = styled.button``;

const AlertBadge = styled.span``;

const NavBar = () => {
  return (
    <Wrapper>
      <Profile>
        <ProfilePhoto />
        <UserName>백주영 님</UserName>
      </Profile>
      <MenuBar>
        <Menu>마이페이지</Menu>
        <Menu>
          나의 별자리
          <ToggleButton />
        </Menu>
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
