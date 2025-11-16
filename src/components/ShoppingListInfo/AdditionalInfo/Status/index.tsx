import Tag from "../../../../ui_components/Tag";
import { useShoppingList } from "../../../../context/ShoppingList/useShoppingList";

const Status = ({ children }: { children: React.ReactNode }) => {
  const { shoppingList } = useShoppingList();
  const isActive = shoppingList?.status === "active";

  return <Tag bg={isActive ? "green" : "grey"}>{children}</Tag>;
};

export default Status;
