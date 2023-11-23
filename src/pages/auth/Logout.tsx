import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const Logout = () => {
	const { isAuthenticated, logout } = useAuth();
	const navigate = useNavigate();
	const [loggingOut, setLoggingOut] = useState(false);

	useEffect(() => {
		const handleLogout = async () => {
			try {
				if (isAuthenticated) {
					setLoggingOut(true);
					await logout();
					navigate("/");
				}
			} catch (error) {
				// Handle logout error (e.g., show an error message)
				console.error("Logout failed:", error);
			} finally {
				setLoggingOut(false);
			}
		};

		handleLogout();
	}, [isAuthenticated, logout, navigate]);

	return loggingOut ? (
		<Typography>Logging out...</Typography> // You can replace this with a loading spinner or any other UI element
	) : null;
};

export default Logout;
