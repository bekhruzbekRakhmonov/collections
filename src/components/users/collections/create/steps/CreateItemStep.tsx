import React from "react";
import { IItem } from "../../../../../utils/interfaces/item";
import { Box, FormControl, TextField, Button, SelectChangeEvent } from "@mui/material";
import Tags from "../utils/Tags";
import { ICustomField } from "../../../../../utils/interfaces/custom-fields";
import getAppropriateField from "../utils/getAppropriateField";

interface CreateItemStepProps {
	customFields: ICustomField[];
	itemCustomFields: ICustomField[][];
	items: IItem[];
	setItems: (data: React.SetStateAction<IItem[]>) => void;
	setItemCustomFields: (data: React.SetStateAction<ICustomField[][]>) => void;
}

const CreateItemStep: React.FC<CreateItemStepProps> = ({ customFields, itemCustomFields, items, setItems, setItemCustomFields }) => {
	const handleItemInputChange = (
		index: number,
		e:
			| React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
			| SelectChangeEvent<string>
	) => {
		const { id, name, value } = e.target as {
			id: string;
			value: string;
			name: string;
		};

		setItems((prevItems) => {
			if (name !== "name") {
				setItemCustomFields((prevState) => {
					const fieldIndex = Number(id);
					const field = customFields[fieldIndex];
					if (prevState.length - 1 < index) {
						prevState.push([]);
					}
					prevState[index][fieldIndex] = {
						type: field.type,
						name: field.name,
						value: value,
					};
					return [...prevState];
				});
			}

			const updatedItems = [...prevItems];
			updatedItems[index] = {
				...updatedItems[index],
				[name]: value,
			};
			return updatedItems;
		});
	};

	const addItem = () => {
		setItems((prevItems) => [
			...prevItems,
			{ name: "", tags: "", custom_fields: customFields },
		]);
	};

	const removeItem = (index: number) => {
		setItems((prevItems) => prevItems.filter((_, i) => i !== index));
	};

	const handleTagsChange = (newTags: string[], itemIndex: number) => {
		setItems((prevItems) => {
			const updatedItems = [...prevItems];
			updatedItems[itemIndex].tags = newTags.join(",");
			return updatedItems;
		})
	};

	return (
		<div>
			<h2>Create Item</h2>
			<Box>
				{items.map((item, itemIndex) => (
					<Box
						display="flex"
						flexDirection="column"
						key={itemIndex}
						marginTop="10px"
					>
						<FormControl key={itemIndex}>
							<TextField
								label="Item Name"
								required
								name="name"
								value={item.name}
								onChange={(
									e: React.ChangeEvent<
										HTMLInputElement | HTMLTextAreaElement
									>
								) => handleItemInputChange(itemIndex, e)}
							/>
							<Tags
								tags={
									item.tags.length > 0
										? item.tags.split(",")
										: []
								}
								onTagsChange={handleTagsChange}
								itemIndex={itemIndex}
							/>
						</FormControl>
						{customFields.map(({ name, type, value }, index) => (
							<Box key={index} sx={{ mb: "10px" }}>
								{getAppropriateField(
									index.toString(),
									itemIndex,
									name,
									type,
									(itemCustomFields[itemIndex] &&
										itemCustomFields[itemIndex][index] &&
										(itemCustomFields[itemIndex][index]
											?.value as string)) ||
										"",
									handleItemInputChange
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
				<br />
				<Button fullWidth variant="contained" onClick={addItem}>
					Add Item
				</Button>
			</Box>
		</div>
	);
};

export default CreateItemStep;
