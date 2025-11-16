import Item from "./Item";
import Box from "../../../../ui_components/Box";
import UnorderedListOfRows from "../../../../ui_components/UnorderedListOfRows";

const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box direction="column" gap="10px">
      <UnorderedListOfRows>{children}</UnorderedListOfRows>
    </Box>
  );
};

Content.Item = Item;
export default Content;
