import styled from "styled-components";
import userImg from "./user.png";

import { Link } from "react-router";

import { useUser } from "../../../../context/UserContext/useUser";

import { useTheme } from "../../../../context/ThemeContext/useTheme";

const Div = styled.div`
  border-radius: 100%;
  cursor: pointer;
  padding-left: 10px;
  position: relative;
`;

const NewsBubble = styled.div`
  border-radius: 100%;
  cursor: pointer;
  position: absolute;
  width: 20px;
  height: 20px;
  background: #e7852fff;
  right: -8px;
  top: -8px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: small;
`;

const Img = styled.img<{ $theme: string }>`
  width: 33px;
  ${({ $theme }) => $theme === "dark" && "filter:invert(1);"}
`;

const UserSettingsIcon = () => {
  const { theme } = useTheme();

  const { user } = useUser();

  const renderNewsBubble = () => {
    if (!user || !user.invitationList || user.invitationList.length === 0)
      return <></>;

    return <NewsBubble>{user.invitationList.length}</NewsBubble>;
  };

  return (
    <Link to="/user/settings">
      <Div>
        {renderNewsBubble()}
        <Img src={userImg} $theme={theme || "light"} />
      </Div>
    </Link>
  );
};

export default UserSettingsIcon;
