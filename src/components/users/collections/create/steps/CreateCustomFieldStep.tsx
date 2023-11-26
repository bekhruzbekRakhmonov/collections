import React from "react";
import { ICustomField } from "../../../../../utils/interfaces/custom-fields";
import { Box, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem, Button, TextField } from "@mui/material";

interface CreateCustomFieldStepProps {
	customFields: ICustomField[];
	setCustomFields: (data: React.SetStateAction<ICustomField[]>) => void;
	setItemCustomFields: (data: React.SetStateAction<ICustomField[][]>) => void;
	itemCustomFields?: ICustomField[][];
	setRemovedItemCustomFieldsIds?: (
		data: React.SetStateAction<number[]>
	) => void;
	setRemovedCollectionCustomFieldsIds?: (
		data: React.SetStateAction<number[]>
	) => void;
}

const CreateCustomFieldStep: React.FC<CreateCustomFieldStepProps> = ({
	customFields,
	setCustomFields,
	setRemovedCollectionCustomFieldsIds,
	setRemovedItemCustomFieldsIds,
	itemCustomFields,
}) => {
	const handleCustomFieldChange = (
		index: number,
		e:
			| React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
			| SelectChangeEvent<string>
	) => {
		if (customFields[index]) {
			const { name, value } = e.target;

			setCustomFields((prevFields) => {
				const updatedFields = [...prevFields];
				updatedFields[index] = {
					...updatedFields[index],
					[name]: value,
				};
				return updatedFields;
			});
		}
	};

	const addCustomField = () => {
		setCustomFields((prevFields) => [
			...prevFields,
			{ name: "", type: "" },
		]);
	};

	const removeCustomField = (index: number) => {
		setCustomFields((prevFields) =>
			prevFields.filter((_, i) => index !== i)
		);
		if (
			setRemovedCollectionCustomFieldsIds &&
			customFields &&
			customFields[index] &&
			customFields[index].id
		) {
			setRemovedCollectionCustomFieldsIds((prevIds) => [
				...prevIds,
				Number(customFields[index].id),
			]);
		}

		if (setRemovedItemCustomFieldsIds)
			setRemovedItemCustomFieldsIds((prevIds) => {
				const updatedIds = [...prevIds];
				itemCustomFields?.forEach((itemFields) => {
					itemFields.map((field) => {
						if (
							field !== undefined &&
							field.id !== undefined &&
							field.name === customFields[index].name
						) {
							updatedIds.push(field.id);
						}
					})
				});
				return updatedIds;
			});
	};
	return (
		<div>
			<h2>Create Custom Field</h2>
			{customFields.map((field, index) => (
				<Box
					key={index}
					display="flex"
					flexDirection="column"
					alignItems="center"
					marginBottom={2}
					justifyContent="center"
				>
					<FormControl
						fullWidth
						variant="outlined"
						margin="normal"
						required
					>
						<InputLabel htmlFor={`type-${index}-label`}>
							Type
						</InputLabel>
						<Select
							labelId={`type-${index}-label`}
							label="type"
							name="type"
							value={field.type}
							onChange={(e) =>
								handleCustomFieldChange(
									index,
									e as SelectChangeEvent<string>
								)
							}
						>
							<MenuItem value="string">string</MenuItem>
							<MenuItem value="integer">integer</MenuItem>
							<MenuItem value="multiline">multiline</MenuItem>
							<MenuItem value="date">date</MenuItem>
							<MenuItem value="boolean">boolean</MenuItem>
						</Select>
					</FormControl>
					<TextField
						fullWidth
						variant="outlined"
						margin="normal"
						label={`Custom Field Name ${index + 1}`}
						name="name"
						value={field.name}
						onChange={(e: any) => handleCustomFieldChange(index, e)}
						required
					/>
					<Button
						fullWidth
						variant="contained"
						onClick={() => removeCustomField(index)}
						color="error"
					>
						Remove
					</Button>
				</Box>
			))}
			<Button
				fullWidth
				variant="contained"
				color="primary"
				onClick={addCustomField}
				style={{ marginBottom: "20px" }}
			>
				Add Custom Field
			</Button>
		</div>
	);
};

export default CreateCustomFieldStep;