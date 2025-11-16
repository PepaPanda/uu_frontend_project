import UnorderedListOfStrings from "../../../ui_components/UnorderedListOfStrings";

const Socials = ({ children }: { children: React.ReactNode }) => {
  return (
    <UnorderedListOfStrings vertical={false}>{children}</UnorderedListOfStrings>
  );
};

import Social from "./Social";

Socials.Social = Social;
export default Socials;
