import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import ResetPasswordForm from "./components/auth/ResetPasswordForm";
import HomePage from "./components/routePages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/auth/login" element={<LoginForm />} />
      <Route path="/auth/signup" element={<SignupForm />} />
      <Route path="/auth/reset-password" element={<ResetPasswordForm />} />

      <Route>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route path="*" element={<h1>No such page found</h1>} />
    </>,
  ),
);

export default function App() {
  return <RouterProvider router={router} />;
}
