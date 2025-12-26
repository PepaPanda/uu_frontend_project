import Box from "../../ui_components/Box";
import Button from "../../ui_components/Button";
import { useNavigate, useLocation } from "react-router";

//Languages
import { useLanguage } from "../../context/LanguageContext/useLanguage";
import { resolveTranslationString } from "../../helpers/resolveTranslationString";

const ShoppingListBtn = () => {
  const { language } = useLanguage();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box gap="20px">
      <Button onClick={() => navigate(`${location.pathname}/members`)}>
        {resolveTranslationString("members", language)}
      </Button>
      <Button onClick={() => navigate(`${location.pathname}/settings`)}>
        {resolveTranslationString("settings", language)}
      </Button>
    </Box>
  );
};

export default ShoppingListBtn;
