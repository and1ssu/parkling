import styled from "styled-components";

export const HeaderContainer = styled.header`
  background-color: #4dd0e1;
  padding: 15px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

export const NavMenu = styled.nav`

  width: 100%;
  height: ${({ active }) => (active ? "500px" : "0px")};
  padding: 15px;
  position: absolute;
  top: 66px;
  right: 0px;
  transition: 0.3s;
  z-index: ${({ active }) => (active ? "1" : "-1")};
  background: #4dd0e1;
  opacity: ${({ active }) => (active ? " 1" : " 0")};
`;

export const Logo = styled.img`
  src: src;
  cursor: pointer;
`;

export const Close = styled.img`
  src: src;
  display: ${({ active }) => (active ? "block" : "none")};
  cursor: pointer;
`;

export const Menu = styled.img`
  src: src;
  display: ${({ active }) => (active ? "none" : "block")};
  cursor: pointer;
`;

export const Link = styled.a`
  color: #fff;
  display: block;
  margin-bottom: 46px;
  cursor: pointer;
`;
