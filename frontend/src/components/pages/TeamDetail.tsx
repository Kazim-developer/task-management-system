import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../../handlers/getData";
import ProtectedRoute from "../ProtectedRoute";
import useShowElementStore from "../../store/showElement.store";
import MemberModalContainer from "../MemberModalContainer";
import AssignTaskModalContainer from "../AssignTaskModalContainer";

export default function TeamDetails() {
  const { id } = useParams();

  const showAddMemberModal = useShowElementStore((s) => s.showAddMemberModal);
  const setShowAddMemberModal = useShowElementStore(
    (s) => s.setShowAddMemberModal,
  );

  const showAssignTaskModal = useShowElementStore((s) => s.showAssignTaskModal);
  const setShowAssignTaskModal = useShowElementStore(
    (s) => s.setShowAssignTaskModal,
  );

  const { data, isLoading } = useQuery({
    queryKey: ["team", id],
    queryFn: () => getData(`team/${id}`),
  });

  const team = data ?? {};

  if (isLoading || !team) return <p className="p-6">Loading...</p>;

  const admin = team?.members?.find((m: any) => m.role === "ADMIN");
  const members = team?.members?.filter((m: any) => m.role !== "ADMIN") || [];

  return (
    <ProtectedRoute>
      <div className="p-6 space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <p className="text-gray-500">Team overview</p>
          </div>

          <div className="flex gap-3">
            <button
              className="px-4 py-2 bg-gray-200 rounded-lg"
              onClick={() => setShowAddMemberModal(true)}
            >
              Add Members
            </button>
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              onClick={() => setShowAssignTaskModal(true)}
            >
              Assign Task
            </button>
          </div>
        </div>

        {/* ADMIN */}
        <div className="p-4 border rounded-xl bg-yellow-50">
          <h2 className="font-semibold mb-2">Admin</h2>
          <p>{admin?.user?.name || "No admin found"}</p>
          <p className="text-sm text-gray-500">{admin?.user?.email}</p>
        </div>

        {/* MEMBERS */}
        <div className="space-y-3">
          <h2 className="font-semibold">Members</h2>

          {members.length === 0 ? (
            <p className="text-gray-500">No members yet</p>
          ) : (
            members.map((m: any) => (
              <div
                key={m.id}
                className="p-3 border rounded-lg flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{m.user.name}</p>
                  <p className="text-sm text-gray-500">{m.user.email}</p>
                </div>

                <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                  {m.role}
                </span>
              </div>
            ))
          )}
        </div>

        {/* TASK STATUS SECTION (simple placeholder) */}
        <div className="border rounded-xl p-4">
          <h2 className="font-semibold mb-3">Task Status</h2>

          {data.tasks?.length ? (
            data.tasks.map((t: any) => (
              <div
                key={t.id}
                className="flex justify-between p-2 border-b last:border-none"
              >
                <p>{t.title}</p>
                <p>Assigned To: {t.assignedTo.name}</p>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    t.status === "DONE" ? "bg-green-100" : "bg-yellow-100"
                  }`}
                >
                  {t.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No tasks assigned yet</p>
          )}
        </div>
        {showAddMemberModal && <MemberModalContainer teamId={id as string} />}
        {showAssignTaskModal && (
          <AssignTaskModalContainer teamId={id as string} />
        )}
      </div>
    </ProtectedRoute>
  );
}
