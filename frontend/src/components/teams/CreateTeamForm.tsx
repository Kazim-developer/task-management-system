import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { postData } from "../../handlers/postData";
import { toast } from "react-toastify";
import { hasErrors } from "../../util/hasErrors.util";
import useShowElementStore from "../../store/showElement.store";
import { useAuthStore } from "../../store/auth.store";

type CreateTeam = {
  name: string;
  userId?: string;
};

export default function CreateTeamForm() {
  const userId = useAuthStore((s) => s.userId);
  const [formData, setFormData] = useState<CreateTeam>({ name: "" });

  const setShowCreateTeamModal = useShowElementStore(
    (s) => s.setShowCreateTeamModal,
  );

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (formData: CreateTeam) => postData("create-team", formData),
    onSuccess: (data) => {
      toast.success(data.message);
      setFormData({ name: "" });

      queryClient.invalidateQueries({ queryKey: ["get-teams"] });
    },
    onError: (error) => {
      if (hasErrors(error)) {
        Object.values(error.errors).forEach((msg) => {
          toast.error(String(msg));
        });
      } else {
        toast.error(error.message || "Something went wrong");
      }
    },
  });

  return (
    <form
      className="w-[30%] max-w-[500px] min-w-[300px] p-4 bg-white rounded-lg flex flex-col items-center gap-[1rem]"
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ ...formData, userId });
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="text-center font-bold text-xl">Create Team</h1>
      <input
        type="text"
        placeholder="Enter team name"
        className="w-full p-2 rounded-lg border border-gray-100 focus:border-black"
        value={formData.name}
        required
        onChange={(e) => setFormData({ name: e.target.value })}
      />
      <div className="flex items-center gap-5">
        <button
          type="button"
          className="bg-gray-100 p-2 rounded-lg cursor-pointer"
          onClick={() => setShowCreateTeamModal(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-indigo-600 text-white p-2 rounded-lg cursor-pointer"
        >
          create
        </button>
      </div>
    </form>
  );
}
