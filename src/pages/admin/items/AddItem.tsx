import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import {
	Button,
	TextField,
	Typography,
	Container,
	Box,
	FormLabel,
	FormControl,
} from "@mui/material";
import { admin } from "../../../utils/api/admin";
import Tags from "../../../components/users/collections/create/utils/Tags";

interface AddItemProps {}

interface FormData {
	name: string;
	tags: string[];
}

export const AddItem: React.FC<AddItemProps> = () => {
	const [tags, setTags] = useState<string[]>([]);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			await admin.createItem({ name: data.name, tags: tags.join(","), custom_fields: [] });
			navigate(-1);
		} catch (error) {
			console.error("Error adding item:", error);
		}
	};

	return (
		<Container>
			<Typography variant="h4" gutterBottom>
				Add Item
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
						<Tags
							tags={tags}
							itemIndex={0}
							onTagsChange={(newTags) => {
								setTags(newTags);
							}}
						/>
					</FormControl>
				</Box>
				<Button type="submit" variant="contained" color="primary">
					Add Item
				</Button>
			</form>
		</Container>
	);
};
