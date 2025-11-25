// src/context/useShoppingList.ts
import { useContext } from "react";
import { ShoppingListMultipleContext } from "./ShoppingListMultipleContext";

export const useShoppingListMultiple = () => {
  const ctx = useContext(ShoppingListMultipleContext);

  if (!ctx) {
    throw new Error(
      "useShoppingListMultiple musí být použit uvnitř <ShoppingListMultipleProvider>",
    );
  }

  return ctx;
};
