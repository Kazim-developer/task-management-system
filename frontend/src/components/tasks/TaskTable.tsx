const tasks = [
  {
    id: 1,
    title: "Build dashboard UI",
    status: "IN_PROGRESS",
    assignee: "Kazim",
    dueDate: "May 30",
  },
  {
    id: 2,
    title: "Connect backend API",
    status: "TODO",
    assignee: "Ali",
    dueDate: "June 1",
  },
];

export default function TaskTable() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-semibold text-lg">Tasks</h2>
      </div>

      <table className="w-full">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="p-4">Title</th>
            <th className="p-4">Status</th>
            <th className="p-4">Assignee</th>
            <th className="p-4">Due Date</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t border-gray-100">
              <td className="p-4 font-medium">{task.title}</td>

              <td className="p-4">
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                  {task.status}
                </span>
              </td>

              <td className="p-4">{task.assignee}</td>

              <td className="p-4">{task.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
