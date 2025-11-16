import { useState } from "react";
import { ShoppingListContext } from "./ShoppingListContext";
import type { ShoppingList } from "../../types/ShoppingList";

export const ShoppingListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null);

  return (
    <ShoppingListContext.Provider value={{ shoppingList, setShoppingList }}>
      {children}
    </ShoppingListContext.Provider>
  );
};
