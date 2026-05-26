export const checkAuth = async () => {
  const res = await fetch(`http://localhost:3000/auth/me`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};
