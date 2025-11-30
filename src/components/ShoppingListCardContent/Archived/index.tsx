import calendarImg from "./calendar.png";
import TextWithIcon from "../../../ui_components/TextWithIcon";

const Archived = ({ children }: { children: React.ReactNode }) => {
  return <TextWithIcon imgSrc={calendarImg}>{children}</TextWithIcon>;
};

export default Archived;
