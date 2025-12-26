import { useLocation, useNavigate } from "react-router";
import resolveBackLink from "../../../helpers/resolveBackLink";

import Button from "../../../ui_components/Button";
import backBtn from "./back.png";

import { useLanguage } from "../../../context/LanguageContext/useLanguage";
import { resolveTranslationString } from "../../../helpers/resolveTranslationString";

const BackBtn = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { language } = useLanguage();

  const backLink = resolveBackLink(pathname);
  const handleClick = () => {
    if (backLink) return navigate(backLink);
    navigate("/");
  };

  return backLink ? (
    <Button onClick={handleClick} imgSrc={backBtn}>
      {resolveTranslationString("go back", language)}
    </Button>
  ) : (
    <></>
  );
};

export default BackBtn;
