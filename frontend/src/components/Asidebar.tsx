import clsx from "clsx";

import Close from "./icons/Close";
import Logout from "./auth/Logout";
import useShowElementStore from "../store/showElement.store";
import { NavLink } from "react-router-dom";
import Profile from "./auth/Profile";
import { useAuthStore } from "../store/auth.store";

const links = [
  {
    label: "Dashboard",
    path: "/",
  },
  {
    label: "Teams",
    path: "/teams",
  },
  {
    label: "My Tasks",
    path: "/my-tasks",
  },
];

export default function Asidebar() {
  const showSidebar = useShowElementStore((s) => s.showSidebar);
  const setShowSidebar = useShowElementStore((s) => s.setShowSidebar);

  const name = useAuthStore((s) => s.name);
  const email = useAuthStore((s) => s.email);

  return (
    <section
      className={clsx(
        "sidebar overflow-y-auto w-[250px] h-full bg-white py-6 px-6 absolute top-0 right-0 transition-transform duration-300 ease-in-out",
        showSidebar ? "translate-x-0" : "translate-x-full",
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <Close setShowSidebar={setShowSidebar} />

      <section
        className={clsx(
          "flex flex-col justify-between items-start gap-[1rem] mt-[2rem]",
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <Profile />
          <p>{name}</p>
          <p className="text-gray-600">{email}</p>
        </div>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={() => setShowSidebar(false)}
            className={({ isActive }) =>
              `px-4 py-3 rounded-xl font-medium transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <Logout />
      </section>
    </section>
  );
}
