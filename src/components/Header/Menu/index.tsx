import UnorderedListOfStrings from "../../../ui_components/UnorderedListOfStrings";

const Menu = ({ children }: { children: React.ReactNode }) => {
  return (
    <UnorderedListOfStrings vertical={false}>{children}</UnorderedListOfStrings>
  );
};

import Item from "./Item";
Menu.Item = Item;
export default Menu;
