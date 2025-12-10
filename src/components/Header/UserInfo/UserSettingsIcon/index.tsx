import styled from "styled-components";
import userImg from "./user.png";

import { Link } from "react-router";

import { useUser } from "../../../../context/UserContext/useUser";

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

const Img = styled.img`
  width: 33px;
`;

const UserSettingsIcon = () => {
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
        <Img src={userImg} />
      </Div>
    </Link>
  );
};

export default UserSettingsIcon;
