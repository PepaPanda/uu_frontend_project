import styled from "styled-components";
import userImg from "./user.png";

const Div = styled.div`
  border-radius: 100%;
  backgroung: blue;
  cursor: pointer;
`;

const Img = styled.img`
  width: 27px;
`;

const UserSettingsIcon = () => {
  return (
    <Div>
      <Img src={userImg} />
    </Div>
  );
};

export default UserSettingsIcon;
