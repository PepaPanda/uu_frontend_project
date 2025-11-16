import TextWithIcon from "../../../../ui_components/TextWithIcon";
import membersImg from "./members.png";

const Members = ({ children }: { children: React.ReactNode }) => {
  return <TextWithIcon imgSrc={membersImg}>{children}</TextWithIcon>;
};

export default Members;
