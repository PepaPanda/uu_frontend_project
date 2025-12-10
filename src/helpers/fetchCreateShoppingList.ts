const apiUrl = import.meta.env.VITE_API_URL;
import { nanoid } from "nanoid";

export const fetchCreateShoppingList = async (
  name: string
): Promise<string | null> => {
  if (!apiUrl) {
    const id = nanoid();
    return id;
  } else {
    try {
      const response = await fetch(`${apiUrl}/shoppinglist/create`, {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ name }),
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
