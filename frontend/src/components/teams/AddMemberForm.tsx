import { useState, useRef, useEffect } from "react";
import useShowElementStore from "../../store/showElement.store";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { postData } from "../../handlers/postData";
import { toast } from "react-toastify";
import { hasErrors } from "../../util/hasErrors.util";

type AddMemberState = {
  email: string;
  teamId?: string;
};

type AddMemberProp = {
  teamId: string;
};

export default function AddMemberForm({ teamId }: AddMemberProp) {
  const [formData, setFormData] = useState<AddMemberState>({ email: "" });

  const inputRef = useRef<HTMLInputElement>(null);

  const setShowAddMemberModal = useShowElementStore(
    (s) => s.setShowAddMemberModal,
  );

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (formData: AddMemberState) => postData("add-member", formData),
    onSuccess: (data) => {
      toast.success(data.message);
      setFormData({ email: "" });

      queryClient.invalidateQueries({ queryKey: ["team", teamId] });
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

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form
      className="w-[30%] max-w-[500px] min-w-[300px] p-4 bg-white rounded-lg flex flex-col items-center gap-[1rem]"
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ ...formData, teamId });
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="text-center font-bold text-xl">Create Team</h1>
      <input
        type="text"
        placeholder="Enter email"
        ref={inputRef}
        className="w-full p-2 focus:outline-none border border-gray-300 focus:border-black rounded-lg"
        value={formData.email}
        required
        onChange={(e) => setFormData({ email: e.target.value })}
      />
      <div className="flex items-center gap-5">
        <button
          type="button"
          className="bg-gray-100 p-2 rounded-lg cursor-pointer"
          onClick={() => setShowAddMemberModal(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-indigo-600 text-white p-2 rounded-lg cursor-pointer"
        >
          Add
        </button>
      </div>
    </form>
  );
}
