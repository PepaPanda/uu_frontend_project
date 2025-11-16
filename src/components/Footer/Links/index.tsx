import UnorderedListOfStrings from "../../../ui_components/UnorderedListOfStrings";
import Link from "./Link";

const Links = ({ children }: { children: React.ReactNode }) => {
  return (
    <UnorderedListOfStrings vertical={false}>{children}</UnorderedListOfStrings>
  );
};

Links.Link = Link;
export default Links;
