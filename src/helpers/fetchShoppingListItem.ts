const apiUrl = import.meta.env.VITE_API_URL;
import { nanoid } from "nanoid";

export const fetchCreateListItem = async (
  name: string,
  listId: string
): Promise<string | null> => {
  if (!apiUrl) {
    const id = nanoid();
    return id;
  } else {
    try {
      const response = await fetch(`${apiUrl}/shoppinglist/${listId}/item`, {
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

export const fetchUpdateListItem = async (
  listId: string,
  itemId: string,
  resolved: boolean,
  name: string
): Promise<true | null> => {
  if (!apiUrl) {
    return true;
  } else {
    try {
      const response = await fetch(
        `${apiUrl}/shoppinglist/${listId}/item/${itemId}`,
        {
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify({ name, resolved }),
        }
      );
      if (!response.ok) return null;
      return true;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
};

export const fetchDeleteListItem = async (
  listId: string,
  itemId: string
): Promise<true | null> => {
  if (!apiUrl) {
    return true;
  } else {
    try {
      const response = await fetch(
        `${apiUrl}/shoppinglist/${listId}/item/${itemId}`,
        {
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "DELETE",
        }
      );
      if (!response.ok) return null;
      return true;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
};
