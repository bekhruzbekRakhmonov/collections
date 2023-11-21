import React, { useState } from "react";
import { ICollection } from "../../../../../utils/interfaces/collection";
import { FormLabel, FormControl, InputLabel, Select, MenuItem, TextField, SelectChangeEvent, Button, useTheme } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import ImageDropzone from "../utils/DragDrop";

interface CreateCollectionStepProps {
	collection: ICollection;
	setCollection: (data: React.SetStateAction<ICollection>) => void;
}

const CreateCollectionStep: React.FC<CreateCollectionStepProps> = ({ collection, setCollection }) => {
    const theme = useTheme();

    const handleInputChange = (e: | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
			| React.ChangeEvent<{ value: unknown; name: string }>
			| SelectChangeEvent<string>) => {
                const {name, value} = e.target;
                setCollection((data) => {
                    const updatedData = {...data, [name]: value}
                    return updatedData;
                })
            };

    const handleFileChange = (file: File) => {
		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				const base64String = reader.result as string;
				setCollection((data) => ({...data, photo: base64String}))
			};

			reader.readAsDataURL(file);
		}
	};

	return (
		<div>
			<h2>Create Collection</h2>
			<TextField
				fullWidth
				variant="outlined"
				margin="normal"
				label="Collection Name"
				name="name"
				value={collection.name}
				onChange={handleInputChange}
				required
			/>
			<div data-color-mode={theme.palette.mode}>
				<FormLabel required>Description</FormLabel>
				<MDEditor
					height={200}
					value={collection.description}
					onChange={(value) => {
						setCollection((data) => ({...data, description: value || ""}));
					}}
				/>
			</div>
			<FormControl fullWidth variant="outlined" margin="normal" required>
				<InputLabel id="topic-label">Topic</InputLabel>
				<Select
					labelId="topic-label"
					label="Topic"
					name="topic"
					value={collection.topic}
					onChange={handleInputChange}
				>
					<MenuItem value="Books">Books</MenuItem>
					<MenuItem value="Signs">Signs</MenuItem>
					<MenuItem value="Silverware">Silverware</MenuItem>
				</Select>
			</FormControl>
			<ImageDropzone onImageDrop={handleFileChange} />
		</div>
	);
};

export default CreateCollectionStep;
