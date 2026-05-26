import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  email: string;
  name: string;

  isAuthenticated: boolean;
  authChecked: boolean;
  hydrated: boolean;

  userId: string;

  setAuthUser: (user: Partial<AuthState>) => void;
  resetAuthStore: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set: any) => ({
      email: "",
      name: "",

      isAuthenticated: false,
      authChecked: false,
      hydrated: false,

      userId: "",

      setAuthUser: (data: any) => set((state: any) => ({ ...state, ...data })),

      resetAuthStore: () =>
        set({
          email: "",
          isAuthenticated: false,
          authChecked: false,
          userId: "",
        }),
    }),
    {
      name: "auth-store",

      partialize: (state: any) => ({
        email: state.email,
        isAuthenticated: state.isAuthenticated,
        userId: state.userId,
      }),

      onRehydrateStorage: () => (state: any) => {
        state?.setAuthUser({ hydrated: true });
      },
    },
  ),
);
