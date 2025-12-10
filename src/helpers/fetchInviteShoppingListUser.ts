const apiUrl = import.meta.env.VITE_API_URL;

export const fetchInviteShoppingListUser = async (
  listId: string,
  email: string
) => {
  if (!apiUrl) {
    return { ok: true };
  } else {
    try {
      const response = await fetch(
        `${apiUrl}/shoppinglist/${listId}/user/invite`,
        {
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
          method: "PATCH",
        }
      );

      const text = await response.text();
      const json = text ? JSON.parse(text) : null;
      return { ...json, ok: response.ok };
    } catch (err) {
      console.error(err);
      return null;
    }
  }
};
