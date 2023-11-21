import React from "react";
import { Navigate, Routes, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoutes = () => {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}

	return <Outlet />;
};

export default PrivateRoutes;
