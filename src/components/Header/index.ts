import styled from "styled-components";

interface HeaderComponent extends React.FC<React.ComponentProps<"header">> {
  Logo: typeof Logo;
  Menu: typeof Menu;
  UserInfo: typeof UserInfo;
  BackBtn: typeof BackBtn;
}

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  min-height: 80px;
  border: 2px solid black;
` as HeaderComponent;

import Logo from "./Logo";
import Menu from "./Menu";
import UserInfo from "./UserInfo";
import BackBtn from "./BackBtn";

Header.BackBtn = BackBtn;
Header.UserInfo = UserInfo;
Header.Menu = Menu;
Header.Logo = Logo;
export default Header;
