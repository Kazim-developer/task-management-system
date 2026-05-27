import clsx from "clsx";
import { useAuthStore } from "../../store/auth.store";
import { useState, useEffect, useRef } from "react";
import Logout from "./Logout";

export default function Profile() {
  const userName = useAuthStore((s) => s.name);
  const email = useAuthStore((s) => s.email);

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative" ref={menuRef}>
      {/* Profile Button */}
      <section className={clsx("cursor-pointer")}>
        <button onClick={() => setShowMenu((prev) => !prev)}>
          <div className="h-10 w-10 border-2 border-gray-300 rounded-full flex justify-center items-center bg-gray-100">
            {userName.charAt(0).toUpperCase()}
          </div>
        </button>
      </section>

      {showMenu && (
        <section className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50 flex flex-col gap-[0.5rem]">
          <p className="text-center font-[500]">{userName}</p>
          <p className="text-sm text-gray-700 break-all text-center">{email}</p>

          <hr className="text-gray-200 rounded-full" />
          <Logout />
        </section>
      )}
    </section>
  );
}
