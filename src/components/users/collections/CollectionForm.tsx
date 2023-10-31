import React, { useState } from "react";
import {
	TextField,
	Button,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Box,
	Typography,
    SelectChangeEvent,
} from "@mui/material";

interface CustomField {
	label: string;
	value: string;
}

interface CollectionFormProps {
	onSubmit: (formData: {
		name: string;
		description: string;
		topic: string;
		customFields: CustomField[];
	}) => void;
}

const CollectionForm: React.FC<CollectionFormProps> = ({ onSubmit }) => {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		topic: "",
		customFields: [{ label: "", value: "" }],
	});

	const handleInputChange = (
		e:
			| React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
			| SelectChangeEvent<string>
	) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleCustomFieldChange = (
		index: number,
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		const updatedCustomFields = [...formData.customFields];
		updatedCustomFields[index] = {
			...updatedCustomFields[index],
			[name]: value,
		};
		setFormData((prevState) => ({
			...prevState,
			customFields: updatedCustomFields,
		}));
	};

	const addCustomField = () => {
		setFormData((prevState) => ({
			...prevState,
			customFields: [...prevState.customFields, { label: "", value: "" }],
		}));
	};

	const removeCustomField = (index: number) => {
		const updatedCustomFields = [...formData.customFields];
		updatedCustomFields.splice(index, 1);
		setFormData((prevState) => ({
			...prevState,
			customFields: updatedCustomFields,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				fullWidth
				variant="outlined"
				margin="normal"
				label="Collection Name"
				name="name"
				value={formData.name}
				onChange={handleInputChange}
				required
			/>
			<TextField
				fullWidth
				variant="outlined"
				margin="normal"
				label="Description"
				name="description"
				value={formData.description}
				onChange={handleInputChange}
				required
				multiline
				rows={4}
			/>
			<FormControl fullWidth variant="outlined" margin="normal" required>
				<InputLabel id="topic-label">Topic</InputLabel>
				<Select
					labelId="topic-label"
					label="Topic"
					name="topic"
					value={formData.topic}
					onChange={handleInputChange}
				>
					<MenuItem value="Books">Books</MenuItem>
					<MenuItem value="Signs">Signs</MenuItem>
					<MenuItem value="Silverware">Silverware</MenuItem>
				</Select>
			</FormControl>

			<Typography variant="h6" gutterBottom>
				Custom Fields
			</Typography>
			{formData.customFields.map((field, index) => (
				<Box
					key={index}
					display="flex"
					alignItems="center"
					marginBottom={2}
				>
					<TextField
						fullWidth
						variant="outlined"
						margin="normal"
						label={`Custom Field Label ${index + 1}`}
						name="label"
						value={field.label}
						onChange={(e) => handleCustomFieldChange(index, e)}
						required
					/>
					<TextField
						fullWidth
						variant="outlined"
						margin="normal"
						label={`Custom Field Value ${index + 1}`}
						name="value"
						value={field.value}
						onChange={(e) => handleCustomFieldChange(index, e)}
						required
					/>
					<Button
						variant="outlined"
						color="secondary"
						onClick={() => removeCustomField(index)}
					>
						Remove
					</Button>
				</Box>
			))}
			<Button
				variant="outlined"
				color="primary"
				onClick={addCustomField}
				style={{ marginBottom: "20px" }}
			>
				Add Custom Field
			</Button>

			<Box marginTop={2}>
				<Button variant="contained" color="primary" type="submit">
					Create Collection
				</Button>
			</Box>
		</form>
	);
};

export default CollectionForm;
