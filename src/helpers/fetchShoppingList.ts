import shoppingListData from "../test_data/shopping-list-detail.json";
const apiUrl = import.meta.env.VITE_API_URL;

import type { ShoppingList } from "../types/ShoppingList";

export const fetchShoppingList = async (
  id: string
): Promise<ShoppingList | null> => {
  if (!apiUrl) {
    if (!shoppingListData) return null;
    const testData = JSON.parse(JSON.stringify(shoppingListData));
    if (!testData) return null;

    const shoppingList = testData.filter(
      (list: ShoppingList) => list._id === id
    );

    if (shoppingList.length < 1) return null;

    return shoppingList[0];
  } else {
    try {
      const response = await fetch(`${apiUrl}/shoppinglist/${id}`, {
        credentials: "include",
      });
      if (!response.ok) return null;
      const json = await response.json();
      return json;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
};
