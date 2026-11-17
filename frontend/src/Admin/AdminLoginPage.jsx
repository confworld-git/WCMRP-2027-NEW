import { Navigate, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import useAdminAuth from "./useAdminAuth";

const AdminLoginPage = () => {
  const { admin, status, login } = useAdminAuth();
  const navigate = useNavigate();

  if (status === "checking") {
    return <main className="admin-auth-message">Checking admin session…</main>;
  }
  if (admin) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async (credentials) => {
    await login(credentials);
    navigate("/dashboard", { replace: true });
  };

  return <Login onLogin={handleLogin} />;
};

export default AdminLoginPage;
