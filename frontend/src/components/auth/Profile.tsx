import { useState, useRef, useEffect } from "react";

import Logout from "./Logout";

export default function Profile({ isNavbar }: { isNavbar: boolean }) {
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
      <section
        className={!isNavbar ? "flex flex-col gap-[1rem] mb-[1rem]" : "static"}
      >
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          disabled={!isNavbar}
        ></button>

        {!isNavbar && (
          <div className="flex flex-col justify-start gap-[0.5rem]">
            <p className="text-center font-[500]"></p>
            <p className="text-md text-gray-700 text-center"></p>

            <hr className="text-gray-300 rounded-full" />
          </div>
        )}
      </section>

      {isNavbar && showMenu && (
        <section className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50 flex flex-col gap-[0.5rem]">
          <p className="text-center font-[500]"></p>
          <p className="text-sm text-gray-700 break-all text-center"></p>

          <hr className="text-gray-200 rounded-full" />
          <Logout />
        </section>
      )}
    </section>
  );
}
