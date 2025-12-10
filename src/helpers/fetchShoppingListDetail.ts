const apiUrl = import.meta.env.VITE_API_URL;

export const fetchEditShoppingListDetail = async (
  listId: string,
  name: string,
  status: string
): Promise<true | null> => {
  if (!apiUrl) {
    return true;
  } else {
    try {
      const response = await fetch(`${apiUrl}/shoppinglist/${listId}`, {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({ name, status }),
      });
      if (!response.ok) return null;
      return true;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
};

export const fetchDeleteShoppingListDetail = async (
  listId: string
): Promise<true | null> => {
  if (!apiUrl) {
    return true;
  } else {
    try {
      const response = await fetch(`${apiUrl}/shoppinglist/${listId}`, {
        credentials: "include",
        method: "DELETE",
      });
      if (!response.ok) return null;
      return true;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
};
