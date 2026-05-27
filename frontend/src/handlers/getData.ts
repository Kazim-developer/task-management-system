export async function getData(route: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${route}`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}
