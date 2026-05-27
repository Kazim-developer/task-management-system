import clsx from "clsx";
import Asidebar from "./Asidebar";
import useShowElementStore from "../store/showElement.store";

export default function AsidebarContainer() {
  const showSidebar = useShowElementStore((s) => s.showSidebar);
  const setShowSidebar = useShowElementStore((s) => s.setShowSidebar);

  return (
    <section
      className={clsx(
        "asidebar-container transition-opacity duration-300",
        showSidebar
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none",
      )}
      onClick={() => setShowSidebar(false)}
    >
      <Asidebar />
    </section>
  );
}
