import Button from "../../../../ui_components/Button";
import logoutImg from "./logout.png";

const LogoutBtn = () => {
  return (
    <Button imgSrc={logoutImg} styleType="dark">
      <span>Log out</span>
    </Button>
  );
};

export default LogoutBtn;
