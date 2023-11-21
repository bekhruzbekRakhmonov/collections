import { Box, Typography, TextField, Button, Snackbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IRegister } from "../../../utils/interfaces/register";
import MuiAlert from "@mui/material/Alert";

interface RegisterComponentProps {
	error: string | null;
	userData: IRegister;
	setUserData: (userData: IRegister) => void;
	handleRegister: () => void;
    handleClose: () => void;
    open: boolean;
}

const RegisterComponent: React.FC<RegisterComponentProps> = ({
	error,
    userData,
    setUserData,
    handleRegister,
    handleClose,
    open
}) => {
	const { t } = useTranslation();
	return (
		<Box sx={{ maxWidth: 300, margin: "auto", mt: 3 }}>
			<Typography variant="h4" align="center" gutterBottom>
				{t("register")}
			</Typography>
			<TextField
				label={t("name")}
				fullWidth
				margin="normal"
				value={userData.name}
				onChange={(e) =>
					setUserData({ ...userData, name: e.target.value })
				}
			/>
			<TextField
				label={t("email")}
				fullWidth
				margin="normal"
				value={userData.email}
				onChange={(e) =>
					setUserData({ ...userData, email: e.target.value })
				}
			/>
			<TextField
				label={t("password")}
				fullWidth
				margin="normal"
				type="password"
				value={userData.password}
				onChange={(e) =>
					setUserData({ ...userData, password: e.target.value })
				}
			/>
			<Button variant="contained" onClick={handleRegister} fullWidth>
				{t("register")}
			</Button>

			<Typography variant="body2" align="center" mt={2}>
				{t("Already registered")}?{" "}
				<Link to="/login">{t("Login here")}</Link>
			</Typography>

			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<MuiAlert
					elevation={6}
					variant="filled"
					onClose={handleClose}
					severity="error"
				>
					{error}
				</MuiAlert>
			</Snackbar>
		</Box>
	);
};

export default RegisterComponent;
