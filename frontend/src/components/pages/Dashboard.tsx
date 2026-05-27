import StatCard from "../ui/StatCard";
import TaskTable from "../tasks/TaskTable";
import TeamCard from "../teams/TeamCard";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Manage teams and tasks efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Tasks" value={24} />
        <StatCard title="Completed" value={12} />
        <StatCard title="In Progress" value={8} />
        <StatCard title="Teams" value={4} />
      </div>

      <TaskTable />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Teams</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <TeamCard name="Frontend Team" members={5} />
          <TeamCard name="Backend Team" members={4} />
          <TeamCard name="Design Team" members={3} />
        </div>
      </div>
    </div>
  );
}
