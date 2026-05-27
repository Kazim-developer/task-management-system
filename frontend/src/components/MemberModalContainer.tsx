import clsx from "clsx";

import useShowElementStore from "../store/showElement.store";
import { useEffect } from "react";
import AddMemberForm from "./teams/AddMemberForm";

type MemberModalContainerProp = {
  teamId: string;
};

export default function MemberModalContainer({
  teamId,
}: MemberModalContainerProp) {
  const setShowAddMemberModal = useShowElementStore(
    (s) => s.setShowAddMemberModal,
  );

  const showAddMemberModal = useShowElementStore((s) => s.showAddMemberModal);

  useEffect(() => {
    if (!showAddMemberModal) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [showAddMemberModal]);

  return (
    <section
      className={clsx("model-container")}
      onClick={() => setShowAddMemberModal(false)}
    >
      <AddMemberForm teamId={teamId as string} />
    </section>
  );
}
