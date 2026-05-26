import ProtectedRoute from "../ProtectedRoute";

export default function HomePage() {
  return (
    <ProtectedRoute>
      <h1>Home page</h1>
    </ProtectedRoute>
  );
}
