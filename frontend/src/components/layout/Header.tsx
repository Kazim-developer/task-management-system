import useShowElementStore from "../../store/showElement.store";
import Profile from "../auth/Profile";
import Menu from "../icons/Menu";

export default function Header() {
  const setShowSidebar = useShowElementStore((s) => s.setShowSidebar);
  return (
    <header className="h-20 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold">Team Task Manager</h2>
      </div>

      <div className="flex items-center gap-4 max-[780px]:hidden">
        <Profile />
      </div>
      <Menu setShowSidebar={setShowSidebar} />
    </header>
  );
}
