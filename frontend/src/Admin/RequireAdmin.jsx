import { Navigate } from "react-router-dom";
import useAdminAuth from "./useAdminAuth";

const RequireAdmin = ({ children }) => {
  const { admin, status, authError, refreshSession } = useAdminAuth();

  if (status === "checking") {
    return <main className="admin-auth-message">Verifying admin access…</main>;
  }
  if (status === "error") {
    return (
      <main className="admin-auth-message" role="alert">
        <p>{authError}</p>
        <button type="button" onClick={refreshSession}>
          Retry
        </button>
      </main>
    );
  }
  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAdmin;
