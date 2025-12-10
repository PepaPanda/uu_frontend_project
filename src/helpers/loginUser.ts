const apiUrl = import.meta.env.VITE_API_URL;

export const loginUser = async (email: string, password: string) => {
  if (!apiUrl) return { ok: true };

  console.log(JSON.stringify({ email, password }));
  const response = await fetch(`${apiUrl}/auth/login`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  return { ...data, ok: response.ok, statusCode: response.status };
};

export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
