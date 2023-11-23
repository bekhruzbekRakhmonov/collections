import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useAuth } from "../../../auth/AuthContext";

const UserSettings: React.FC = () => {
	const { user } = useAuth();

	const [name, setName] = useState<string>(user.name);
	const [email, setEmail] = useState<string>(user.email);
	const [password, setPassword] = useState<string>("");

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		console.log("Updated Data:", { name, email, password });

	};

	return (
		<Container
			maxWidth="sm"
			sx={{
				boxShadow: 2,
				borderRadius: 8,
				mt: "15px",
				p: 3,
				border: ".5px solid grey",
			}}
		>
			<form onSubmit={handleSubmit}>
				<Typography variant="h4" gutterBottom>
					Settings
				</Typography>

				<TextField
					label="Name"
					fullWidth
					margin="normal"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<TextField
					label="Email"
					type="email"
					fullWidth
					margin="normal"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<TextField
					label="Password"
					type="password"
					fullWidth
					margin="normal"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<Box mt={2} sx={{ display: "flex", justifyContent: "space-between" }}>
					<Button variant="contained" color="primary" type="submit">
						Update
					</Button>

					<Button variant="contained" color="error" type="submit">
						Delete Account
					</Button>
				</Box>
			</form>
		</Container>
	);
};

export default UserSettings;
