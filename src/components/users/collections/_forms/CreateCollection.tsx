import React, { useState } from "react";
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	SelectChangeEvent,
	Box,
} from "@mui/material";
import { ICollection } from "../../../../utils/interfaces/collection";
import { MyTextField } from "../WizardComponents";
import DragDrop from "./DragDrop";
import MuiAlert from "@mui/material/Alert";
import Tags from "../_components/Tags";

interface CreateCollectionProps {
	formData: ICollection;
	handleInputChange: (e:
			| React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
			| React.ChangeEvent<{ value: unknown; name: string }>
			| SelectChangeEvent<string>) => void;
}

const CreateCollectionForm: React.FC<CreateCollectionProps> = ({ formData, handleInputChange }) => {

	return (
		<>
			<MyTextField
				fullWidth
				variant="outlined"
				margin="normal"
				label="Collection Name"
				name="name"
				value={formData.name}
				onChange={handleInputChange}
				required
			/>
			<MyTextField
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
			<Tags formDataTags={formData.tags} />
			<Box display="flex" width="200px">
				<DragDrop />
			</Box>
		</>
	);
};

export default CreateCollectionForm;
