import { useLocation, useNavigate } from "react-router";
import resolveBackLink from "../../../helpers/resolveBackLink";

import Button from "../../../ui_components/Button";
import backBtn from "./back.png";

const BackBtn = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const backLink = resolveBackLink(pathname);
  const handleClick = () => {
    if (backLink) return navigate(backLink);
    navigate("/");
  };

  return backLink ? (
    <Button onClick={handleClick} imgSrc={backBtn}>
      Go back
    </Button>
  ) : (
    <></>
  );
};

export default BackBtn;
