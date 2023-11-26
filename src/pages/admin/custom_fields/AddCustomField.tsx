import React, { RefObject, useRef } from "react";
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
	InputLabel,
	FormControl,
} from "@mui/material";
import { admin } from "../../../utils/api/admin";
import NewWindow from "react-new-window";

interface AddCustomFieldProps {}

interface FormData {
	name: string;
	value: string;
	type: "string" | "integer" | "multiline" | "boolean" | "date";
}

export const AddCustomField: React.FC<AddCustomFieldProps> = () => {
	const navigate = useNavigate();
	const newWindowRef = useRef<NewWindow | null>(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			await admin.createCustomField(data);

			navigate(`/admin#CustomFields`);
		} catch (error) {
			console.error("Error adding custom field:", error);
		}
	};

	const windowFeatures = "popup=true,left=100,top=100,width=320,height=320";

	const myWindow = window.open("/admin/add-item", "_blank", windowFeatures);
	console.log(myWindow)
	myWindow?.addEventListener('submit', () => {
		console.log("Submitted")
	})
	console.log(myWindow?.document.forms)
	if (myWindow) {
		console.log(myWindow.document.forms)
		myWindow.onformdata = (e) => {
			console.log(e)
		}
	}
	return (
		<Container>
			<Typography variant="h4" gutterBottom>
				Add Custom Field
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
					Add Custom Field
				</Button>
			</form>
		</Container>
	);
};
