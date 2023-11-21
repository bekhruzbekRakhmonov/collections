import React, { useState } from "react";
import { IItem } from "../../../../../utils/interfaces/item";
import { Box, FormControl, FormLabel, TextField, Button, SelectChangeEvent } from "@mui/material";
import Tags from "../utils/Tags";
import { ICustomField } from "../../../../../utils/interfaces/custom-fields";
import getAppropriateField from "../utils/getAppropriateField";

interface CreateItemStepProps {
	customFields: ICustomField[];
	itemCustomFields: ICustomField[];
	items: IItem[];
	setItems: (data: React.SetStateAction<IItem[]>) => void;
	setItemCustomFields: (data: React.SetStateAction<ICustomField[]>) => void;
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
					const field = customFields[fieldIndex]
					prevState[index] = {type: field.type, name, value}
					return prevState;
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
		setItems((prevItems) => {
			const updatedItems = [...prevItems];
			updatedItems.splice(index, 1);
			return updatedItems;
		});
	};

	const handleTagsChange = (newTags: string[], itemIndex: number) => {
		items[itemIndex].tags = newTags.join(",");
		console.log(newTags, itemIndex);
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
								tags={item.tags.length > 0 ? item.tags.split(",") : []}
								onTagsChange={handleTagsChange}
								itemIndex={itemIndex}
							/>
						</FormControl>
						{item.custom_fields
							? item.custom_fields?.map(
									({ name, type, value }, index) => (
										<Box key={index}>
											{getAppropriateField(
												index.toString(),
												itemIndex,
												name,
												type,
												(
													item as Record<
														string,
														string
													>
												)[name] || (value as string),
												handleItemInputChange
											)}
											<br />
										</Box>
									)
							  )
							: customFields.map(
									({ name, type, value }, index) => (
										<Box key={index}>
											{getAppropriateField(
												index.toString(),
												itemIndex,
												name,
												type,
												(
													item as Record<
														string,
														string
													>
												)[name] || (value as string),
												handleItemInputChange
											)}
											<br />
										</Box>
									)
							  )}
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
