import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateAdminRoutes = () => {
	const { isAuthenticated, user } = useAuth();

	if (!isAuthenticated || user.role !== "admin") {
		return <Navigate to="/login" />;
	}

	return <Outlet />;
};

export default PrivateAdminRoutes;
