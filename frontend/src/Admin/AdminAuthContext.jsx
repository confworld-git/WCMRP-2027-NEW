import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminAuthContext from "./adminAuthState";
import adminApi from "./adminApi";

export const AdminAuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [status, setStatus] = useState("checking");
  const [authError, setAuthError] = useState("");

  const refreshSession = useCallback(async () => {
    setStatus("checking");
    setAuthError("");
    try {
      const { data } = await adminApi.get("/api/admin/auth/me");
      setAdmin(data.admin);
      setStatus("authenticated");
    } catch (error) {
      setAdmin(null);
      if (error.response?.status === 401) {
        setStatus("anonymous");
      } else {
        setAuthError("Could not verify the admin session. Try again.");
        setStatus("error");
      }
    }
  }, []);

  useEffect(() => {
    let active = true;
    adminApi
      .get("/api/admin/auth/me")
      .then(({ data }) => {
        if (active) {
          setAdmin(data.admin);
          setStatus("authenticated");
        }
      })
      .catch((error) => {
        if (!active) {
          return;
        }
        setAdmin(null);
        if (error.response?.status === 401) {
          setStatus("anonymous");
        } else {
          setAuthError("Could not verify the admin session. Try again.");
          setStatus("error");
        }
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (status !== "authenticated") {
      return undefined;
    }

    let active = true;
    const timer = window.setInterval(async () => {
      try {
        const { data } = await adminApi.get("/api/admin/auth/me");
        if (active) {
          setAdmin(data.admin);
        }
      } catch (error) {
        if (!active) {
          return;
        }
        setAdmin(null);
        if (error.response?.status === 401) {
          setStatus("anonymous");
        } else {
          setAuthError("Could not verify the admin session. Try again.");
          setStatus("error");
        }
      }
    }, 60 * 1000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [status]);

  const login = useCallback(async (credentials) => {
    try {
      const { data } = await adminApi.post(
        "/api/admin/auth/login",
        credentials,
      );
      setAdmin(data.admin);
      setStatus("authenticated");
      setAuthError("");
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Could not sign in. Try again.",
        { cause: error },
      );
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await adminApi.post("/api/admin/auth/logout");
      navigate("/", { replace: true });
      setAdmin(null);
      setStatus("anonymous");
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Could not sign out. Try again.",
        { cause: error },
      );
    }
  }, [navigate]);

  const value = useMemo(
    () => ({ admin, status, authError, login, logout, refreshSession }),
    [admin, status, authError, login, logout, refreshSession],
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
