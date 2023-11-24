import { Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import NotFoundPage from "../components/error/NotFound";

const PrivateAdminRoutes = () => {
	const { isAuthenticated, user } = useAuth();

	if (!isAuthenticated || user.role !== "admin") {
		return <NotFoundPage />;
	}

	return <Outlet />;
};

export default PrivateAdminRoutes;
