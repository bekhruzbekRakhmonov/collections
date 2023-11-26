import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useAuth } from "../../../auth/AuthContext";
import { usersApi } from "../../../utils/api/users";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../../../components/users/collections/delete/DeleteDialog";

const UserSettings: React.FC = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const [name, setName] = useState<string>(user.name);
	const [email, setEmail] = useState<string>(user.email);
	const [password, setPassword] = useState<string>("");
	const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

	const handleSubmit = async (event: React.FormEvent) => {
		try {
			event.preventDefault();
			if (user) {
				await usersApi.updateUser(user.id, {name, email, password});
				navigate(0);
			}
		} catch (error: any) {
			console.error(error.message)
		}
	};

	const handleDelete = async () => {
		try {
			await usersApi.deleteAccount();
			await logout()
		} catch (error: any) {
			console.error(error.message)
		} finally {
			handleOpenCloseDeleteDialog();
		}
	}

	const handleOpenCloseDeleteDialog = () => {
		setOpenDeleteDialog(!openDeleteDialog);
	}

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
			<DeleteDialog onClose={handleOpenCloseDeleteDialog} open={openDeleteDialog} onDelete={handleDelete}/>
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

					<Button variant="contained" color="error" onClick={handleOpenCloseDeleteDialog}>
						Delete Account
					</Button>
				</Box>
			</form>
		</Container>
	);
};

export default UserSettings;
