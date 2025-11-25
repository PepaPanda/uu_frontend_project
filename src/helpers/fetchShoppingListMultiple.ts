import shoppingListMultipleData from "../test_data/shopping-list-multiple.json";
// const apiUrl = import.meta.env.VITE_API_URL;

import type { ShoppingListMultiple } from "../types/ShoppingList";

// import { useUser } from "../context/UserContext/useUser";

export const fetchShoppingListMultiple = async (): Promise<ShoppingListMultiple | null> => {
  // Adjust later for production
  
  // const { user } = useUser(); //Fetch /api/user/{userId}/shoppinglist?offset={offsetNumber}&sort={sortType}&status={status}
  // if(!user) return null;

  if (!shoppingListMultipleData) return null;
  const testData = JSON.parse(JSON.stringify(shoppingListMultipleData));
  if (!testData) return null;
  return testData;

  /* try {
    const response = await fetch(`${apiUrl}/user/${user?.id}/shoppinglist`);
    if (!response.ok) return null;
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(err);
    return null;
  } */
};
