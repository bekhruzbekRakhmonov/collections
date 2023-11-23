import React, { useEffect } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
	let { isAuthenticated, logout } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
            logout();
			navigate("/");
		}
	}, []);

	return <></>;
};

export default Logout;
