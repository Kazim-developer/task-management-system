import clsx from "clsx";

import useShowElementStore from "../store/showElement.store";
import { useEffect } from "react";
import CreateTeamForm from "./teams/CreateTeamForm";

export default function TeamModalContainer() {
  const setShowCreateTeamModel = useShowElementStore(
    (s) => s.setShowCreateTeamModal,
  );

  const showCreateTeamModel = useShowElementStore((s) => s.showCreateTeamModal);

  useEffect(() => {
    if (!showCreateTeamModel) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [showCreateTeamModel]);

  return (
    <section
      className={clsx("model-container")}
      onClick={() => setShowCreateTeamModel(false)}
    >
      <CreateTeamForm />
    </section>
  );
}
