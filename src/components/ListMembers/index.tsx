import Member from "./Member";
import Gap from "../../ui_components/Gap";

import UnorderedListOfRows from "../../ui_components/UnorderedListOfRows";

//Languages
import { useLanguage } from "../../context/LanguageContext/useLanguage";
import { resolveTranslationString } from "../../helpers/resolveTranslationString";

const ListMembers = ({ children }: { children: React.ReactNode }) => {
  const { language } = useLanguage();

  return (
    <>
      <h4>{resolveTranslationString("current members", language)}</h4>
      <Gap $height="5px" />
      <UnorderedListOfRows>{children}</UnorderedListOfRows>
    </>
  );
};

ListMembers.Member = Member;
export default ListMembers;
