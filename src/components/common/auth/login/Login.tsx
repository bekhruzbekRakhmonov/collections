import { Box, Typography, TextField, Button } from "@mui/material";
import { error } from "console";
import React from "react";
import { Link } from "react-router-dom";
import { ILogin } from "../../../../utils/interfaces/login";
import { useTranslation } from "react-i18next";

interface LoginComponentProps {
	error: string | null;
	credentials: ILogin;
	setCredentials: (credentials: ILogin) => void;
    handleLogin: () => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ error, credentials, setCredentials, handleLogin }) => {
    const {t} = useTranslation();
    return (
		<Box sx={{ maxWidth: 300, margin: "auto", mt: 3 }}>
			<Typography variant="h4" align="center" gutterBottom>
				{t("login")}
			</Typography>
			{error && (
				<Typography variant="body2" color="error" align="center" mb={2}>
					{error}
				</Typography>
			)}
			<TextField
				label={t("email")}
				fullWidth
				margin="normal"
				value={credentials.email}
				onChange={(e) =>
					setCredentials({ ...credentials, email: e.target.value })
				}
			/>
			<TextField
				label={t("password")}
				fullWidth
				margin="normal"
				type="password"
				value={credentials.password}
				onChange={(e) =>
					setCredentials({ ...credentials, password: e.target.value })
				}
			/>
			<Button variant="contained" onClick={handleLogin} fullWidth>
				{t("login")}
			</Button>
			<Typography variant="body2" align="center" mt={2}>
				{t("Not registered yet")}?{" "}
				<Link to="/register">{t("Register here")}</Link>
			</Typography>
		</Box>
	);
}

export default LoginComponent;