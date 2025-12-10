const apiUrl = import.meta.env.VITE_API_URL;

export const logoutUser = async () => {
  if (!apiUrl) return;

  await fetch(`${apiUrl}/auth/logout`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    method: "POST",
  });
};
