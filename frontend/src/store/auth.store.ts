import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  email: string;
  name: string;
  userId: string;

  isAuthenticated: boolean;
  authChecked: boolean;
  hydrated: boolean;

  setAuthUser: (data: Partial<AuthState>) => void;
  resetAuthStore: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: "",
      name: "",
      userId: "",

      isAuthenticated: false,
      authChecked: false,
      hydrated: false,

      setAuthUser: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),

      resetAuthStore: () =>
        set({
          email: "",
          name: "",
          userId: "",
          isAuthenticated: false,
          authChecked: true,
        }),
    }),
    {
      name: "auth-store",

      partialize: (state) => ({
        email: state.email,
        name: state.name,
        userId: state.userId,
        isAuthenticated: state.isAuthenticated,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setAuthUser({ hydrated: true });
      },
    },
  ),
);
