import Box from "../../../../ui_components/Box";

import { useLanguage } from "../../../../context/LanguageContext/useLanguage";
import { resolveTranslationString } from "../../../../helpers/resolveTranslationString";

const Total = ({ children }: { children: React.ReactNode }) => {
  const { language } = useLanguage();

  return (
    <Box direction="column" align="flex-end">
      <span style={{ fontSize: "0.8rem" }}>
        {resolveTranslationString("total items", language)}
      </span>
      <strong style={{ paddingRight: "2px" }}>{children}</strong>
    </Box>
  );
};

export default Total;
