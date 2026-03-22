import { Navigate, useLocation } from "react-router-dom";
import { useUserProfile } from "../context/UserProfileContext";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isAuthenticated } = useUserProfile();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: `${location.pathname}${location.search}` }} />;
  }

  return children;
}