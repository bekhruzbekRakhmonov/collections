import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import { admin } from "../../../utils/api/admin";
import { IItem } from "../../../utils/interfaces/item";

interface EditItemProps {
}
interface FormData extends IItem {
}

export const EditItem: React.FC<EditItemProps> = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormData>();

	useEffect(() => {
		const fetchItemData = async () => {
			try {
				const data = await admin.getItem(Number(id));

				setValue("name", data.name);
				setValue("tags", data.tags);
			} catch (error) {
				console.error("Error fetching item data:", error);
			}
		};

		fetchItemData();
	}, [id, setValue]);

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			await admin.updateItem(Number(id), data)

			navigate(`/items/${id}`);
		} catch (error) {
			console.error("Error updating item data:", error);
		}
	};

	return (
		<Container>
			<Typography variant="h4" gutterBottom>
				Edit Item
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
					<TextField label="Tags" fullWidth {...register("tags")} />
				</Box>
				<Button type="submit" variant="contained" color="primary">
					Save Changes
				</Button>
			</form>
		</Container>
	);
};
