import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getData } from "../../handlers/getData";
import { postData } from "../../handlers/postData";
import { toast } from "react-toastify";
import { hasErrors } from "../../util/hasErrors.util";

type MyTasksState = {
  taskId: string;
};

export default function MyTasks() {
  const { data, isLoading } = useQuery({
    queryKey: ["my-tasks"],
    queryFn: () => getData("my-tasks"),
    retry: false,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (formData: MyTasksState) => postData("update-task", formData),
    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({ queryKey: ["my-tasks"] });
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

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Tasks</h1>
          <p className="text-gray-500 mt-1">Tasks assigned to you.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {data?.map((task: any) => (
          <div
            key={task.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                {task.status}
              </span>

              <span className="text-sm text-gray-500">
                {task.dueDate.split("T")[0]}
              </span>
            </div>

            <h2 className="text-lg font-semibold mb-3">{task.title}</h2>

            <div className="flex items-center gap-1 mb-3">
              <h2 className="font-semibold">Team: </h2>
              <h2>{task.team.name}</h2>
            </div>

            <div className="flex items-center gap-1 mb-3">
              <h2 className="font-semibold">Admin: </h2>
              <h2>{task.team.createdBy.name}</h2>
            </div>

            <div className="flex items-center gap-3 mt-5">
              <button
                className="flex-1 bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition disabled:opacity-[0.5]"
                disabled={task.status === "DONE"}
                onClick={() => {
                  mutate({ taskId: task.id });
                }}
              >
                Mark as Done
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
