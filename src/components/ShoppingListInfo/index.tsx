import Box from "../../ui_components/Box";
import Name from "./Name";
import AdditionalInfo from "./AdditionalInfo";

const ShoppingListInfo = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box direction="column" justify="normal" padding="0">
      {children}
    </Box>
  );
};

ShoppingListInfo.AdditionalInfo = AdditionalInfo;
ShoppingListInfo.Name = Name;
export default ShoppingListInfo;
