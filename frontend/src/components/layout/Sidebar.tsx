import { NavLink } from "react-router-dom";

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

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-5 max-[780px]:hidden">
      <h1 className="text-2xl font-bold mb-10">TaskFlow</h1>

      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
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
      </nav>
    </aside>
  );
}
