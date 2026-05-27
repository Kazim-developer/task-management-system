import { useQuery } from "@tanstack/react-query";
import StatCard from "../ui/StatCard";
import { getData } from "../../handlers/getData";

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getData("stats"),
  });

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Manage teams and tasks efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Tasks" value={data?.totalTasks ?? 0} />
        <StatCard title="Completed" value={data?.completedTasks ?? 0} />
        <StatCard title="Pending" value={data?.pendingTasks ?? 0} />
        <StatCard title="Teams" value={data?.totalTeams ?? 0} />
      </div>
    </div>
  );
}
