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
} from "@mui/material";
import { admin } from "../../../utils/api/admin";

interface EditCustomFieldProps {
}

interface FormData {
	name: string;
	value: string;
	type: "string" | "integer" | "multiline" | "boolean" | "date";
}

export const EditCustomField: React.FC<EditCustomFieldProps> = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormData>();

	useEffect(() => {
		const fetchCustomFieldData = async () => {
			try {
				const data = await admin.getCustomField(Number(id));

				setValue("name", data.name);
				setValue("value", data.value);
				setValue("type", data.type);
			} catch (error) {
				console.error("Error fetching custom field data:", error);
			}
		};

		fetchCustomFieldData();
	}, [id, setValue]);

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			await admin.updateCustomField(Number(id), data);

			navigate(`/customfields/${id}`);
		} catch (error) {
			console.error("Error updating custom field data:", error);
		}
	};

	return (
		<Container>
			<Typography variant="h4" gutterBottom>
				Edit Custom Field
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
					<TextField label="Value" fullWidth {...register("value")} />
				</Box>
				<Box marginBottom={2}>
					<FormControl fullWidth>
						<InputLabel>Type</InputLabel>
						<Select {...register("type")}>
							<MenuItem value="string">String</MenuItem>
							<MenuItem value="integer">Integer</MenuItem>
							<MenuItem value="multiline">Multiline</MenuItem>
							<MenuItem value="boolean">Boolean</MenuItem>
							<MenuItem value="date">Date</MenuItem>
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
