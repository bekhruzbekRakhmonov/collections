import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import {
	Button,
	TextField,
	Typography,
	Container,
	Box,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	FormLabel,
} from "@mui/material";
import { admin } from "../../../utils/api/admin";

interface EditUserProps {

}

interface FormData {
	email: string;
	name: string;
	status: "active" | "blocked";
	role: "user" | "admin";
}

export const EditUser: React.FC<EditUserProps> = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		watch
	} = useForm<FormData>();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const data = await admin.getUser(Number(id))

				// Set form values based on the fetched data
				setValue("email", data.email);
				setValue("name", data.name);
				setValue("status", data.status);
				setValue("role", data.role);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchUserData();
	}, [id, setValue]);

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			await admin.updateUser(Number(id), data);

			navigate(-1);
		} catch (error) {
			console.error("Error updating user data:", error);
		}
	};

	return (
		<Container sx={{ p: "20px" }}>
			<Typography variant="h4" gutterBottom>
				Edit User
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box marginBottom={2}>
					<FormControl fullWidth>
						<FormLabel>Email</FormLabel>
						<TextField
							fullWidth
							{...register("email", {
								required: "Email is required",
							})}
							error={!!errors.email}
							helperText={errors.email?.message}
						/>
					</FormControl>
				</Box>
				<Box marginBottom={2}>
					<FormControl fullWidth>
						<FormLabel>Name</FormLabel>
						<TextField
							fullWidth
							{...register("name", {
								required: "Name is required",
							})}
							error={!!errors.name}
							helperText={errors.name?.message}
						/>
					</FormControl>
				</Box>
				<Box marginBottom={2}>
					<FormControl fullWidth>
						<FormLabel>Status</FormLabel>
						<Select
							{...register("status")}
							value={watch().status}
						>
							<MenuItem value="active">active</MenuItem>
							<MenuItem value="blocked">blocked</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<Box marginBottom={2}>
					<FormControl fullWidth>
						<FormLabel>Role</FormLabel>
						<Select {...register("role") }>
							<MenuItem value="user">user</MenuItem>
							<MenuItem value="admin">admin</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<Button type="submit" variant="contained" color="primary">
					Save Changes
				</Button>
			</form>
		</Container>
	);
};
