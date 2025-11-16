import shoppingListData from "../test_data/shopping-list.json";
const apiUrl = import.meta.env.VITE_API_URL;

import type { ShoppingList } from "../types/ShoppingList";

export const fetchShoppingList = async (
  id: string,
): Promise<ShoppingList | null> => {
  //Delete after production - for build testing
  if (!shoppingListData) return null;
  const testData = JSON.parse(JSON.stringify(shoppingListData));
  if (!testData || !testData.name) return null;
  return testData;

  try {
    const response = await fetch(`${apiUrl}/shoppinglist/${id}`);
    if (!response.ok) return null;
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(err);
    return null;
  }
};
