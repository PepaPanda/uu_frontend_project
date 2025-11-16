import styled from "styled-components";

const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const UserInfo = ({ children }: { children: React.ReactNode }) => {
  return <Div>{children}</Div>;
};

import UserSettingsIcon from "./UserSettingsIcon";
import LogoutBtn from "./LogoutBtn";

UserInfo.UserSettingsIcon = UserSettingsIcon;
UserInfo.LogoutBtn = LogoutBtn;

export default UserInfo;
