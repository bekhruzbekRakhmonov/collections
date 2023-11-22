import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Typography, Container, Box, FormLabel, FormControl, Chip } from "@mui/material";
import { admin } from "../../../utils/api/admin";
import { IItem } from "../../../utils/interfaces/item";
import Tags from "../../../components/users/collections/create/utils/Tags";

interface EditItemProps {
}
interface FormData extends IItem {
}

export const EditItem: React.FC<EditItemProps> = () => {
	const { id } = useParams<{ id: string }>();
	const [tags, setTags] = useState<string[]>([]);
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
				setTags(data.tags.split(","))
			} catch (error) {
				console.error("Error fetching item data:", error);
			}
		};

		fetchItemData();
	}, [id, setValue]);

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			await admin.updateItem(Number(id), {name: data.name, tags: tags.join(",")})

			navigate(-1);
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
						<Tags tags={tags} itemIndex={0} onTagsChange={(tags, itemIndex) => {
							setTags(tags);
						}}/>
					</FormControl>
				</Box>
				<Button type="submit" variant="contained" color="primary">
					Save Changes
				</Button>
			</form>
		</Container>
	);
};
