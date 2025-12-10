import shoppingListData from "../test_data/user-owner.json";
const apiUrl = import.meta.env.VITE_API_URL;

import type { ShoppingListOwner } from "../types/ShoppingList";

export const fetchShoppingListUsers = async (
  listId: string
): Promise<ShoppingListOwner[] | null> => {
  if (!apiUrl) {
    return JSON.parse(JSON.stringify(shoppingListData));
  } else {
    try {
      const response = await fetch(`${apiUrl}/shoppinglist/${listId}/user`, {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      if (!response.ok) return null;
      const json = await response.json();
      return json._id;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
};
