"use client";

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
    retry: false,
    enabled: hydrated && !authChecked,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!hydrated) return;

    const user = data?.user;

    if (isSuccess && user) {
      setAuthUser({
        userId: user.id,
        email: user.email,
        name: user.name,
        isAuthenticated: true,
        authChecked: true,
      });
    }

    if (isError) {
      setAuthUser({
        userId: "",

        email: "",

        isAuthenticated: false,
        authChecked: true,
      });
    }
  }, [hydrated, isSuccess, isError, data]);

  if (!hydrated || !authChecked) {
    return <h1>Loading ...</h1>;
  }

  return <>{children}</>;
}
