import Sidebar from "./Sidebar";
import Header from "./Header";

import { Outlet } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import useShowElementStore from "../../store/showElement.store";
import AsidebarContainer from "../AsidebarContainer";

export default function DashboardLayout() {
  const showSidebar = useShowElementStore((s) => s.showSidebar);
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 flex">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header />

          <main className="p-6">
            <Outlet />
          </main>
        </div>
        {showSidebar && <AsidebarContainer />}
      </div>
    </ProtectedRoute>
  );
}
