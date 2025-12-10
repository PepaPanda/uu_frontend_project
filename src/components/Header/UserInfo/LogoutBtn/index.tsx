import Button from "../../../../ui_components/Button";
import logoutImg from "./logout.png";

import { useUser } from "../../../../context/UserContext/useUser";
import { logoutUser } from "../../../../helpers/logoutUser";
import { useNavigate } from "react-router";

const LogoutBtn = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate("/login");
  };

  return (
    <Button imgSrc={logoutImg} styleType="dark" onClick={handleLogout}>
      <span>Log out</span>
    </Button>
  );
};

export default LogoutBtn;
