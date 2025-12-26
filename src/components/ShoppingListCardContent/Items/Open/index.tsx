import Box from "../../../../ui_components/Box";

import { useLanguage } from "../../../../context/LanguageContext/useLanguage";
import { resolveTranslationString } from "../../../../helpers/resolveTranslationString";

const Open = ({ children }: { children: React.ReactNode }) => {
  const { language } = useLanguage();
  return (
    <Box direction="column">
      <span style={{ fontSize: "0.8rem" }}>
        {resolveTranslationString("open items", language)}
      </span>
      <strong>{children}</strong>
    </Box>
  );
};

export default Open;
