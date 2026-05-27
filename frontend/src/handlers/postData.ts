export async function postData(route: string, postedData: any) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${route}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postedData),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}
