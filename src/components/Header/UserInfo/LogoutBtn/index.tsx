import Button from "../../../../ui_components/Button";
import logoutImg from "./logout.png";

import { useUser } from "../../../../context/UserContext/useUser";
import { logoutUser } from "../../../../helpers/logoutUser";
import { useNavigate } from "react-router";
import { useLanguage } from "../../../../context/LanguageContext/useLanguage";

import { resolveTranslationString } from "../../../../helpers/resolveTranslationString";

const LogoutBtn = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const { language } = useLanguage();

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate("/login");
  };

  return (
    <Button imgSrc={logoutImg} styleType="dark" onClick={handleLogout}>
      <span>{resolveTranslationString("log out", language)}</span>
    </Button>
  );
};

export default LogoutBtn;
