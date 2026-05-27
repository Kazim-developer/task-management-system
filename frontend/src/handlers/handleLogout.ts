const handleLogout = async () => {
  await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export default handleLogout;
