import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";
import { postData } from "../../handlers/postData";
import { toast } from "react-toastify";
import { hasErrors } from "../../util/hasErrors.util";
import useShowElementStore from "../../store/showElement.store";
import MemberSelection from "../tasks/MemberSelection";

export type AssignTaskState = {
  task: string;
  memberId: string;
  dueDate: string;
  teamId: string;
};

type AssignTaskProp = {
  teamId: string;
};

export default function AssignTaskForm({ teamId }: AssignTaskProp) {
  const [formData, setFormData] = useState<AssignTaskState>({
    task: "",
    memberId: "",
    dueDate: "",
    teamId: "",
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const setShowAssignTaskModal = useShowElementStore(
    (s) => s.setShowAssignTaskModal,
  );

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (formData: AssignTaskState) =>
      postData("assign-task", formData),
    onSuccess: (data) => {
      toast.success(data.message);
      setFormData({ task: "", memberId: "", dueDate: "", teamId: "" });

      queryClient.invalidateQueries({ queryKey: ["team", teamId] });
      queryClient.invalidateQueries({ queryKey: ["team-members", teamId] });
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
        placeholder="Enter task"
        ref={inputRef}
        className="w-full p-2 focus:outline-none border border-gray-300 focus:border-black rounded-lg"
        value={formData.task}
        required
        onChange={(e) => setFormData((s) => ({ ...s, task: e.target.value }))}
      />
      <MemberSelection teamId={teamId} setFormData={setFormData} />
      <div className="w-full">
        <p>Due date</p>
        <input
          type="date"
          className="w-full p-2 focus:outline-none border border-gray-300 focus:border-black rounded-lg"
          required
          onChange={(e) =>
            setFormData((s) => ({ ...s, dueDate: e.target.value }))
          }
        />
      </div>
      <div className="flex items-center gap-5">
        <button
          type="button"
          className="bg-gray-100 p-2 rounded-lg cursor-pointer"
          onClick={() => setShowAssignTaskModal(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-indigo-600 text-white p-2 rounded-lg cursor-pointer"
        >
          Assign
        </button>
      </div>
    </form>
  );
}
