import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import ResetPasswordForm from "./components/auth/ResetPasswordForm";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./components/pages/Dashboard";
import MyTasks from "./components/pages/MyTasks";
import Teams from "./components/pages/Teams";
import TeamDetails from "./components/pages/TeamDetail";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/auth/login" element={<LoginForm />} />
      <Route path="/auth/signup" element={<SignupForm />} />
      <Route path="/auth/reset-password" element={<ResetPasswordForm />} />

      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />

        <Route path="/my-tasks" element={<MyTasks />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="teams/:id" element={<TeamDetails />} />
      </Route>

      <Route path="*" element={<h1>No such page found</h1>} />
    </>,
  ),
);

export default function App() {
  return <RouterProvider router={router} />;
}
