const apiUrl = import.meta.env.VITE_API_URL;

export const fetchAcceptInvitation = async (listId: string) => {
  if (!apiUrl) {
    return { ok: true };
  } else {
    try {
      const response = await fetch(
        `${apiUrl}/user/invitation/${listId}/accept`,
        {
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
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

export const fetchDeclineInvitation = async (listId: string) => {
  if (!apiUrl) {
    return { ok: true };
  } else {
    try {
      const response = await fetch(
        `${apiUrl}/user/invitation/${listId}/decline`,
        {
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
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
