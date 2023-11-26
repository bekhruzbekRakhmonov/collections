import React, { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { IRegister } from "../../utils/interfaces/register";
import RegisterComponent from "../../components/common/auth/register/Register";

const Register = () => {
	const navigate = useNavigate();
	const [userData, setUserData] = useState<IRegister>({
		name: "",
		email: "",
		password: "",
	});
	const { register } = useAuth();
	const [error, setError] = useState<string | null>(null);
	const [open, setOpen] = useState<boolean>(false);

	const handleRegister = async () => {
		try {
			await register(userData);
			navigate("/login");
		} catch (error: any) {
			if (error.response && error.response.status === 422) {
				setError(
					"Invalid data. Please check your input and try again."
				);
			} else {
				setError("Registration failed. Please try again.");
			}
			setOpen(true);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	return <RegisterComponent error={error} open={open} handleClose={handleClose} handleRegister={handleRegister} userData={userData} setUserData={setUserData} />
};

export default Register;
