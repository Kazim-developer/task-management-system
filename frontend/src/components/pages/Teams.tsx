import { useQuery } from "@tanstack/react-query";
import useShowElementStore from "../../store/showElement.store";
import TeamModalContainer from "../TeamModalContainer";
import TeamCard from "../teams/TeamCard";
import { getData } from "../../handlers/getData";

export default function Teams() {
  const showCreateTeamModal = useShowElementStore((s) => s.showCreateTeamModal);
  const setShowCreateTeamModal = useShowElementStore(
    (s) => s.setShowCreateTeamModal,
  );

  const { data, isLoading } = useQuery({
    queryKey: ["get-teams"],
    queryFn: () => getData("teams"),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teams</h1>
          <p className="text-gray-500 mt-1">Manage your project teams.</p>
        </div>

        <button
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition"
          onClick={() => setShowCreateTeamModal(true)}
        >
          Create Team
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data?.teams?.map((team: any) => (
          <TeamCard
            key={team.id}
            name={team.name}
            teamId={team.id}
            members={team.members.length}
          />
        ))}
      </div>
      {showCreateTeamModal && <TeamModalContainer />}
    </div>
  );
}
