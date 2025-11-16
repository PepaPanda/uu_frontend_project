// src/context/useShoppingList.ts
import { useContext } from "react";
import { ShoppingListContext } from "./ShoppingListContext";

export const useShoppingList = () => {
  const ctx = useContext(ShoppingListContext);

  if (!ctx) {
    throw new Error(
      "useShoppingList musí být použit uvnitř <ShoppingListProvider>",
    );
  }

  return ctx;
};
