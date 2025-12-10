import shoppingListMultipleData from "../test_data/shopping-list-multiple.json";
const apiUrl = import.meta.env.VITE_API_URL;

import type { ShoppingListMultiple } from "../types/ShoppingList";

// import { useUser } from "../context/UserContext/useUser";

export const fetchShoppingListMultiple = async (
  userId: string
): Promise<ShoppingListMultiple | null> => {
  if (!apiUrl) {
    if (!shoppingListMultipleData) return null;
    const testData = JSON.parse(JSON.stringify(shoppingListMultipleData));
    if (!testData) return null;
    return testData;
  } else {
    console.log(userId);
    if (!userId) return null;
    try {
      const response = await fetch(`${apiUrl}/user/${userId}/shoppinglist`, {
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

  // const { user } = useUser(); //Fetch /api/user/{userId}/shoppinglist?offset={offsetNumber}&sort={sortType}&status={status}
};
