import React from "react";
import {
	Box,
	Button,
	SelectChangeEvent,
	FormControl,
	InputLabel,
	MenuItem,
	Typography,
	Select,
} from "@mui/material";
import { ICustomField } from "../../../../utils/interfaces/custom-fields";
import { MyTextField, WizardStep } from "../WizardComponents";

interface CustomFieldProps {
	handleCustomFieldChange: (
		index: number,
		e:
			| React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
			| SelectChangeEvent<string>
	) => void;
	addCustomField: () => void;
	removeCustomField: (index: number) => void;
	formData: ICustomField[];
}

const CreateCustomFieldsForm: React.FC<CustomFieldProps> = ({ handleCustomFieldChange, addCustomField, removeCustomField, formData }) => {
	return (
			<Box>
				<Typography variant="h5" textAlign="center" marginTop="20px">
					Custom Fields
				</Typography>
				{formData.map((field, index) => (
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
						<MyTextField
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
			</Box>
	);
};

export default CreateCustomFieldsForm;
