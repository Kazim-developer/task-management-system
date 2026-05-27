const tasks = [
  {
    id: 1,
    title: "Implement authentication",
    status: "IN_PROGRESS",
    dueDate: "May 28",
  },
  {
    id: 2,
    title: "Create dashboard UI",
    status: "TODO",
    dueDate: "May 30",
  },
  {
    id: 3,
    title: "Connect backend APIs",
    status: "COMPLETED",
    dueDate: "June 1",
  },
];

export default function MyTasks() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Tasks</h1>
          <p className="text-gray-500 mt-1">Tasks assigned to you.</p>
        </div>

        <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition">
          Create Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                {task.status}
              </span>

              <span className="text-sm text-gray-500">{task.dueDate}</span>
            </div>

            <h2 className="text-lg font-semibold mb-3">{task.title}</h2>

            <div className="flex items-center gap-3 mt-5">
              <button className="flex-1 bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition">
                Update
              </button>

              <button className="flex-1 bg-gray-100 py-2 rounded-xl hover:bg-gray-200 transition">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
