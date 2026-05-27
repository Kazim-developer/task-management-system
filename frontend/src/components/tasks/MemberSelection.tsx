"use client";

import { useQuery } from "@tanstack/react-query";
import { getData } from "../../handlers/getData";
import type { AssignTaskState } from "../teams/AssignTaskForm";

type MemberGroups = {
  teamId: string;
  setFormData: React.Dispatch<React.SetStateAction<AssignTaskState>>;
};

export default function MemberSelection({ teamId, setFormData }: MemberGroups) {
  const { data, isLoading } = useQuery({
    queryKey: ["team-members", teamId],
    queryFn: () => getData(`team-members/${teamId}`),
  });

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <select
      defaultValue=""
      className="w-full p-2 rounded-lg border border-gray-300 focus:border-black"
      required
      onChange={(e) => {
        const value = e.target.value;

        setFormData((s) => ({ ...s, memberId: value }));
      }}
    >
      <option value="" disabled>
        Select member
      </option>

      {data.members.map((member: any) => (
        <option key={member.userId} value={member.userId}>
          {member.user.name}
        </option>
      ))}
    </select>
  );
}
