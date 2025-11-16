import TextWithIcon from "../../../../ui_components/TextWithIcon";
import ownerImg from "./owner.png";

const Owner = ({ children }: { children: React.ReactNode }) => {
  return <TextWithIcon imgSrc={ownerImg}>{children} (Owner)</TextWithIcon>;
};

export default Owner;
