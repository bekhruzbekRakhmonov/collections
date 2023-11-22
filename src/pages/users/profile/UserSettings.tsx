// Import necessary dependencies
import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useAuth } from "../../../auth/AuthContext";

// Define the UserSettings component
const UserSettings: React.FC = () => {
	// Access user data from the authentication context
	const { user } = useAuth();

	const [name, setName] = useState<string>(user.name);
	const [email, setEmail] = useState<string>(user.email);
	const [password, setPassword] = useState<string>("");

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		console.log("Updated Data:", { name, email, password });

	};

	return (
		<Container maxWidth="sm" sx={{ boxShadow: 2, borderRadius: 8, mt: "15px", p: 3, border: '.5px solid grey' }}>
			<form onSubmit={handleSubmit}>
				{/* Title */}
				<Typography variant="h4" gutterBottom>
					Settings
				</Typography>

				{/* Name Input */}
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

				<Box mt={2}>
					<Button variant="contained" color="primary" type="submit">
						Update
					</Button>
				</Box>
			</form>
		</Container>
	);
};

export default UserSettings;
