import Content from "./Content";
import Summary from "./Summary";
import Box from "../../../ui_components/Box";

const ListItems = ({ children }: { children: React.ReactNode }) => {
  return <Box direction="column">{children}</Box>;
};

ListItems.Content = Content;
ListItems.Summary = Summary;
export default ListItems;
