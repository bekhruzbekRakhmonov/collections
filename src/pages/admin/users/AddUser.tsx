import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import {
	Button,
	TextField,
	Typography,
	Container,
	Box,
	Select,
	MenuItem,
	FormControl,
	FormLabel,
} from "@mui/material";
import { admin } from "../../../utils/api/admin";
import { IRowUser, IUser } from "../../../utils/interfaces/user";
import SnackbarAlert from "../../../components/utils/SnackbarAlert";

interface AddUserProps {}

export const AddUser: React.FC<AddUserProps> = () => {
	const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleClose = () => {
        setOpenAlert(false);
    }

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<Partial<IRowUser>>();

	const onSubmit: SubmitHandler<Partial<IRowUser>> = async (data) => {
		try {
			await admin.createUser(data);

			navigate("/admin#Users");
		} catch (error: any) {
            setError(error.message)
            setOpenAlert(true);
			console.error("Error adding user:", error);
		}
	};

	return (
		<Container sx={{ p: "20px" }}>
			<Typography variant="h4" gutterBottom>
				Add User
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
						<Select {...register("status")} value={watch().status}>
							<MenuItem value="active">active</MenuItem>
							<MenuItem value="blocked">blocked</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<Box marginBottom={2}>
					<FormControl fullWidth>
						<FormLabel>Role</FormLabel>
						<Select {...register("role")}>
							<MenuItem value="user">user</MenuItem>
							<MenuItem value="admin">admin</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<Box marginBottom={2}>
					<FormControl fullWidth>
						<FormLabel>Password</FormLabel>
						<TextField
                            type="password"
							fullWidth
							{...register("password", {
								required: "Password is required",
							})}
							error={!!errors.password}
							helperText={errors.password?.message}
						/>
					</FormControl>
				</Box>
				<Button type="submit" variant="contained" color="primary">
					Add User
				</Button>
			</form>
            <SnackbarAlert message={error} open={openAlert} handleClose={handleClose} severity="error"/>
		</Container>
	);
};
