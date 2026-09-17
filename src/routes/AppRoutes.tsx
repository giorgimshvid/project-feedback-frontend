import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";
import Landing from "../pages/Landing";
import Login from "../pages/Login";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Landing / Dashboard-ის დაცული მარშრუტი */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Landing />
          </ProtectedRoute>
        }
      />

      {/* Catch-all (*) — ნებისმიერ უცნობ URL-ზე გადამისამართება */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
