import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import LogoImage from "../../assets/avatar_parking.svg";
import MenuImage from "../../assets/menu.svg";
import CloseImage from "../../assets/close.svg";

import { HeaderContainer, NavMenu, Close, Logo, Menu, Link } from "./styles";

export default function NavBar() {
  const [Sidebar, setSidebar] = useState(false);

  let navigate = useNavigate();

  return (
    <HeaderContainer>
      <Logo
        src={LogoImage}
        onClick={() => {
          navigate("/");
        }}
        alt="Logo Parking"
      />
      <Menu
        src={MenuImage}
        onClick={() => {
          setSidebar(true);
        }}
        active={Sidebar}
        width={36}
      />
      <Close
        src={CloseImage}
        onClick={() => {
          setSidebar(false);
        }}
        active={Sidebar}
        width={36}
      />
      <NavMenu active={Sidebar}>
        <ul>
          <Link
            onClick={() => {
              navigate("/");
            }}
          >
            Entrada
          </Link>
          <Link
            onClick={() => {
              navigate("/exit");
            }}
          >
            Saída
          </Link>
        </ul>
      </NavMenu>
    </HeaderContainer>
  );
}
