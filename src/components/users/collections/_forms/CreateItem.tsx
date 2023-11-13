import React from "react";
import { ICustomField } from "../../../../utils/interfaces/custom-fields";
import { Box, Button, FormControl, FormLabel, SelectChangeEvent, TextField, TextareaAutosize } from "@mui/material";
import { IItem } from "../../../../utils/interfaces/item";

interface CreateItemFormProps {
	customFields: ICustomField[];
	items: IItem[];
	handleInputChange: (
		index: number,
		e:
			| React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
			| SelectChangeEvent<string>
	) => void;
	addItem: () => void;
	removeItem: (index: number) => void;
}

const getAppropriateField = (
	index: number,
	name: string,
	type: string,
	value: string,
	handleInputChange: (
		index: number,
		e:
			| React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
			| SelectChangeEvent<string>
	) => void
): React.ReactNode => {
	switch (type) {
		case "multiline":
			return (
				<FormControl>
					<FormLabel>{name}</FormLabel>
					<TextareaAutosize
						name={name}
						onChange={(
							e: React.ChangeEvent<
								HTMLInputElement | HTMLTextAreaElement
							>
						) => handleInputChange(index, e)}
						value={value}
					/>
				</FormControl>
			);
		case "string":
			return (
				<FormControl>
					<FormLabel>{name}</FormLabel>
					<TextField
						name={name}
						value={value}
						onChange={(
							e: React.ChangeEvent<
								HTMLInputElement | HTMLTextAreaElement
							>
						) => handleInputChange(index, e)}
					/>
				</FormControl>
			);
		case "integer":
			return (
				<FormControl>
					<FormLabel>{name}</FormLabel>
					<TextField
						type="number"
						name={name}
						value={value}
						onChange={(
							e: React.ChangeEvent<
								HTMLInputElement | HTMLTextAreaElement
							>
						) => handleInputChange(index, e)}
					/>
				</FormControl>
			);
		case "date":
			return (
				<FormControl>
					<FormLabel>{name}</FormLabel>
					<TextField
						type="date"
						name={name}
						value={value}
						onChange={(
							e: React.ChangeEvent<
								HTMLInputElement | HTMLTextAreaElement
							>
						) => handleInputChange(index, e)}
					/>
				</FormControl>
			);
		case "boolean":
			return (
				<FormControl>
					<FormLabel>{name}</FormLabel>
					<TextField
						type="checkbox"
						name={name}
						value={value}
						onChange={(
							e: React.ChangeEvent<
								HTMLInputElement | HTMLTextAreaElement
							>
						) => handleInputChange(index, e)}
					/>
				</FormControl>
			);
		default:
			return (
				<FormControl>
					<FormLabel>{name}</FormLabel>
					<TextField
						name={name}
						value={value}
						onChange={(
							e: React.ChangeEvent<
								HTMLInputElement | HTMLTextAreaElement
							>
						) => handleInputChange(index, e)}
					/>
				</FormControl>
			);
	}
};

const CreateItemForm: React.FC<CreateItemFormProps> = ({ customFields, items, addItem, removeItem, handleInputChange }) => {
	return (
		<Box>
			{items.map((item, itemIndex) => (
				<Box display="flex" flexDirection="column" key={itemIndex} marginTop="10px">
					<FormControl key={itemIndex}>
						<FormLabel>Item Name</FormLabel>
						<TextField
							name="name"
							value={item.name}
							onChange={(
								e: React.ChangeEvent<
									HTMLInputElement | HTMLTextAreaElement
								>
							) => handleInputChange(itemIndex, e)}
						/>
					</FormControl>
					{customFields.map(({ name, type, value }, index) => (
						<Box key={index}>
							{getAppropriateField(
								itemIndex,
								name,
								type,
								(item as Record<string, string>)[name],
								handleInputChange
							)}
							<br />
						</Box>
					))}
					<br />
					<Button
						variant="contained"
						color="error"
						onClick={() => removeItem(itemIndex)}
					>
						Remove
					</Button>
				</Box>
			))}
			<br/>
			<Button  fullWidth variant="contained" onClick={addItem}>
				Add Item
			</Button>
		</Box>
	);
};

export default CreateItemForm;