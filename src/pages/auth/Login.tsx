import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { TextField, Button, Typography, Box } from "@mui/material";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ILogin } from "../../utils/interfaces/login";
import LoginComponent from "../../components/auth/login/Login";


const Login = () => {
  const [credentials, setCredentials] = useState<ILogin>({
    email: "",
    password: "",
  });
  let { isAuthenticated, login, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
	if (isAuthenticated) {
		navigate(-1);
	}
  }, [])

  const handleLogin = async () => {
		try {
			await login(credentials);
			navigate(-1);
		} catch (err) {
			if (err instanceof AxiosError) {
				error = "Internal Server Error"
			}
		}
  };

  return (
		<LoginComponent error={error} credentials={credentials} setCredentials={setCredentials} handleLogin={handleLogin}/>
  );
};

export default Login;
