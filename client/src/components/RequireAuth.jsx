import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function RequireAuth() {
    const { user, loading } = useAuth();

    if (loading) return <h1>Loading...</h1>;
    if (!user) return <Navigate to="/login" replace />;

    return <Outlet />;
}