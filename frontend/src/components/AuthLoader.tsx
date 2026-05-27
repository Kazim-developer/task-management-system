import { useAuthStore } from "../store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../handlers/checkAuth";
import { useEffect } from "react";

export default function AuthLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const hydrated = useAuthStore((s) => s.hydrated);
  const authChecked = useAuthStore((s) => s.authChecked);
  const setAuthUser = useAuthStore((s) => s.setAuthUser);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["me"],
    queryFn: checkAuth,
    enabled: hydrated && !authChecked,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!hydrated) return;

    if (isSuccess && data?.user) {
      setAuthUser({
        userId: data.user.id,
        email: data.user.email,
        name: data.user.name,
        isAuthenticated: true,
        authChecked: true,
      });
      return;
    }

    if (isError) {
      setAuthUser({
        userId: "",
        email: "",
        name: "",
        isAuthenticated: false,
        authChecked: true,
      });
    }
  }, [hydrated, isSuccess, isError, data, setAuthUser]);

  if (!hydrated || !authChecked) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
}
