import Box from "../../ui_components/Box";

//Sub
import Items from "./Items";
import Name from "./Name";
import Owner from "./Owner";

const ShoppingListCardContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Box direction="column" justify="space-between" height="100%">
      {children}
    </Box>
  );
};

ShoppingListCardContent.Items = Items;
ShoppingListCardContent.Name = Name;
ShoppingListCardContent.Owner = Owner;

export default ShoppingListCardContent;
