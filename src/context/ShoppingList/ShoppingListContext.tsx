import { createContext } from "react";
import type { ShoppingList } from "../../types/ShoppingList";
import type { Dispatch, SetStateAction } from "react";

type ShoppingListContextType = {
  shoppingList: ShoppingList | null;
  setShoppingList: Dispatch<SetStateAction<ShoppingList | null>>;
};

export const ShoppingListContext = createContext<
  ShoppingListContextType | undefined
>(undefined);
