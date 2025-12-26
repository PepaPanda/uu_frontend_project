import TextWithIcon from "../../../../ui_components/TextWithIcon";
import ownerImg from "./owner.png";

//Languages
import { useLanguage } from "../../../../context/LanguageContext/useLanguage";
import { resolveTranslationString } from "../../../../helpers/resolveTranslationString";

const Owner = ({ children }: { children: React.ReactNode }) => {
  const { language } = useLanguage();

  return (
    <TextWithIcon imgSrc={ownerImg}>
      {children} ({resolveTranslationString("owner", language)})
    </TextWithIcon>
  );
};

export default Owner;
