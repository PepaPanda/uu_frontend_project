import ownerImg from "./owner.png";
import TextWithIcon from "../../../ui_components/TextWithIcon";

const Owner = ({ children }: { children: React.ReactNode }) => {
  return <TextWithIcon imgSrc={ownerImg}>{children}</TextWithIcon>;
};

export default Owner;
