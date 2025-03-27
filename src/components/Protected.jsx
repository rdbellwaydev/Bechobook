import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Authentication/AuthContext";

const ProtectedRoute = () => {
  const { authToken } = useAuth(); // Use authToken from context
  

  return authToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
