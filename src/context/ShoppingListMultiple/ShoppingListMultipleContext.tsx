import { createContext } from "react";
import type { ShoppingListMultiple } from "../../types/ShoppingList";
import type { Dispatch, SetStateAction } from "react";

type ShoppingListMultipleContextType = {
  shoppingListMultiple: ShoppingListMultiple | null;
  setShoppingListMultiple: Dispatch<SetStateAction<ShoppingListMultiple | null>>;
};

export const ShoppingListMultipleContext = createContext<
  ShoppingListMultipleContextType | undefined
>(undefined);
