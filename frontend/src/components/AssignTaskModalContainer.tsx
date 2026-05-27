import clsx from "clsx";

import useShowElementStore from "../store/showElement.store";
import { useEffect } from "react";
import AssignTaskForm from "./teams/AssignTaskForm";

export default function AssignTaskModalContainer({
  teamId,
}: {
  teamId: string;
}) {
  const setShowAssignTaskModal = useShowElementStore(
    (s) => s.setShowAssignTaskModal,
  );

  const showAssignTaskModal = useShowElementStore((s) => s.showAssignTaskModal);

  useEffect(() => {
    if (!showAssignTaskModal) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [showAssignTaskModal]);

  return (
    <section
      className={clsx("model-container")}
      onClick={() => setShowAssignTaskModal(false)}
    >
      <AssignTaskForm teamId={teamId} />
    </section>
  );
}
