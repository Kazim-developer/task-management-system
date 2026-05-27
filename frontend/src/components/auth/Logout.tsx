import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import handleLogout from "../../handlers/handleLogout";

import { useAuthStore } from "../../store/auth.store";

export default function Logout() {
  const queryClient = useQueryClient();

  const resetAuthStore = useAuthStore((s) => s.resetAuthStore);

  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: handleLogout,

    onSuccess: async () => {
      resetAuthStore();

      queryClient.clear();

      navigate("/");
    },
  });

  return (
    <button
      disabled={isPending}
      className="cursor-pointer px-4 py-1 bg-red-100 text-red-600 font-[500] rounded-[10px]"
      onClick={() => logout()}
    >
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
}
