import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import { admin } from "../../../utils/api/admin";

interface EditCollectionProps {
}

interface FormData {
	name: string;
	description: string;
	topic: string;
	photo: string;
}

export const EditCollection: React.FC<EditCollectionProps> = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormData>();

	useEffect(() => {
		const fetchCollectionData = async () => {
			try {
				const data = await admin.getCollection(Number(id));

				// Set form values based on the fetched data
				setValue("name", data.name);
				setValue("description", data.description);
				setValue("topic", data.topic);
				setValue("photo", data.photo);
			} catch (error) {
				console.error("Error fetching collection data:", error);
			}
		};

		fetchCollectionData();
	}, [id, setValue]);

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			await admin.updateCollection(Number(id), data);

			navigate(`/collections/${id}`);
		} catch (error) {
			console.error("Error updating collection data:", error);
		}
	};

	return (
		<Container>
			<Typography variant="h4" gutterBottom>
				Edit Collection
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box marginBottom={2}>
					<TextField
						label="Name"
						fullWidth
						{...register("name", { required: "Name is required" })}
						error={!!errors.name}
						helperText={errors.name?.message}
					/>
				</Box>
				<Box marginBottom={2}>
					<TextField
						label="Description"
						fullWidth
						{...register("description")}
					/>
				</Box>
				<Box marginBottom={2}>
					<TextField
						label="Topic"
						fullWidth
						{...register("topic", {
							required: "Topic is required",
						})}
						error={!!errors.topic}
						helperText={errors.topic?.message}
					/>
				</Box>
				<Box marginBottom={2}>
					<TextField
						label="Photo URL"
						fullWidth
						{...register("photo")}
					/>
				</Box>
				<Button type="submit" variant="contained" color="primary">
					Save Changes
				</Button>
			</form>
		</Container>
	);
};

