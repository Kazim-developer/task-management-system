export async function getData(route: string) {
  const res = await fetch(`http://localhost:3000/${route}`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}
