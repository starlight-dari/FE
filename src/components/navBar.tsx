// import "../globals.css";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import chevron_up from "/public/chevron_up.svg";
import chevron_down from "/public/chevron_down.svg";
import { useRouter } from "next/navigation";
import LogoutButton from "./logoutButton";
import axios from "axios";

interface NavBarProps {
  isOpen: boolean;
  navRef: React.RefObject<HTMLDivElement | null>;
}

interface UserData {
  name: string;
  profileUrl: string;
  petList: {
    pet_id: number;
    pet_img: string;
    pet_name: string;
  }[];
}

const NavBar = ({ isOpen, navRef }: NavBarProps) => {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `http://${server_url}:8080/member/nav`,
          withCredentials: true,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        });

        console.log("서버 응답:", response);

        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("유저 정보 요청 중 오류 발생:", error);
        setLoading(false);
      }
    };

    getUserInfo();
  }, []);

  if (loading) {
    return (
      <Wrapper isOpen={isOpen} ref={navRef}>
        <Profile>
          <div>유저 정보를 받아오고 있어요...</div>
        </Profile>
        <MenuBar>
          <Menu onClick={() => router.push(`/mypage`)}>마이페이지</Menu>
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
              <div style={{ padding: "10px" }}>
                유저 정보를 받아오고 있어요...
              </div>
            </SubMenu>
          )}
          <Menu onClick={() => router.push(`/memoryAlbum`)}>
            추억앨범
            <AlertBadge />
          </Menu>
          <Menu onClick={() => router.push(`/community`)}>추억 저장소</Menu>
          <Menu onClick={() => router.push(`/shareReview`)}>후기 나눔</Menu>
        </MenuBar>
      </Wrapper>
    );
  }

  return (
    <Wrapper isOpen={isOpen} ref={navRef}>
      <Profile>
        {userData ? (
          <>
            <ProfilePhoto
              src={userData.profileUrl}
              alt="kakaotalk profile photo"
            />
            <User>
              <UserName>{userData.name}</UserName>
              <span>님</span>
            </User>
            <LogoutButton />
          </>
        ) : (
          <div style={{ paddingLeft: "10px" }}>
            유저 정보가 존재하지 않습니다.
          </div>
        )}
      </Profile>
      <MenuBar>
        <Menu onClick={() => router.push(`/mypage`)}>마이페이지</Menu>
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
            {userData ? (
              !userData.petList || userData?.petList.length === 0 ? (
                <NoPet>
                  <div>아직 별자리가 없어요.</div>
                  <div>새 별자리를 만들어 보세요.</div>
                  <Button onClick={() => router.push("/add_new_animal")}>
                    별자리 만들러 가기
                  </Button>
                </NoPet>
              ) : (
                userData.petList.map((item, index) => (
                  <Item key={index}>
                    <PetImage src={item.pet_img} alt="" />
                    {item.pet_name}
                  </Item>
                ))
              )
            ) : (
              <div style={{ padding: "10px" }}>
                유저 정보가 존재하지 않습니다.
              </div>
            )}
          </SubMenu>
        )}
        <Menu onClick={() => router.push(`/memoryAlbum`)}>
          추억앨범
          <AlertBadge />
        </Menu>
        <Menu onClick={() => router.push(`/community`)}>추억 저장소</Menu>
        <Menu onClick={() => router.push(`/shareReview`)}>후기 나눔</Menu>
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
  position: relative;
`;

const ProfilePhoto = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  background: gray;
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
  cursor: pointer;
`;

const AlertBadge = styled.span``;

const NoPet = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 30px 10px;
  height: 80px;
  align-items: center;
  // justify-content: center;
  position: relative;
`;

const Button = styled.button`
  border: none;
  background: #22225e;
  cursor: pointer;
  padding: 10px 20px;
  color: #fff;
  border-radius: 5px;
  position: absolute;
  bottom: 10px;
`;
