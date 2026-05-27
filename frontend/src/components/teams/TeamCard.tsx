import { useNavigate } from "react-router-dom";

interface TeamCardProps {
  teamId: string;
  name: string;
  members: number;
}

export default function TeamCard({ teamId, name, members }: TeamCardProps) {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-gray-500 text-sm mt-1">{members} members</p>
        </div>

        <button
          className="bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200 transition"
          onClick={() => navigate(`/teams/${teamId}`)}
        >
          View
        </button>
      </div>
    </div>
  );
}
