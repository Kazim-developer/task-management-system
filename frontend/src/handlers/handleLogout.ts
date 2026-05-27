const handleLogout = async () => {
  await fetch(`http://localhost:3000/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export default handleLogout;
