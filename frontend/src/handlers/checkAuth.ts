export const checkAuth = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};
