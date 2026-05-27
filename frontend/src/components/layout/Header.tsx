import Profile from "../auth/Profile";

export default function Header() {
  return (
    <header className="h-20 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold">Team Task Manager</h2>
      </div>

      <div className="flex items-center gap-4">
        <Profile />
      </div>
    </header>
  );
}
