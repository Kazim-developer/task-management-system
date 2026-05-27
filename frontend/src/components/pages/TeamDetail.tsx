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
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  const team = data ?? {};

  if (isLoading || !team) return <p className="p-6">Loading...</p>;

  const admin = team?.members?.find((m: any) => m.role === "ADMIN");
  const members = team?.members?.filter((m: any) => m.role !== "ADMIN") || [];

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between gap-2 max-[530px]:flex-col max-[530px]:items-start">
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
                className="flex flex-col gap-2 p-2 border-b last:border-none"
              >
                <div className="flex items-center justify-between gap-1 max-[580px]:flex-col max-[580px]:items-start">
                  <div className="flex items-center gap-1 justify-between">
                    <h2 className="font-semibold">Task: </h2>
                    <h2>{t.title}</h2>
                  </div>
                  <div className="flex items-center gap-1 justify-between">
                    <h2 className="font-semibold">Status: </h2>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        t.status === "DONE" ? "bg-green-300" : "bg-yellow-300"
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <h2 className="font-semibold">Assigned To: </h2>
                  <h2>{t.assignedTo.name}</h2>
                </div>
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
