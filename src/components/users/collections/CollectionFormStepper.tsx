import React, { useState } from "react";
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	SelectChangeEvent,
	Box,
	Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { createCollection } from "../../../utils/api/users/collections";
import { ICollection } from "../../../utils/interfaces/collection";
import { ICustomField } from "../../../utils/interfaces/custom-fields";
import { IItem } from "../../../utils/interfaces/item";
import { Wizard, WizardStep } from "./WizardComponents";
import CreateCustomFieldsForm from "./_forms/CreateCustomFields";
import CreateItemForm from "./_forms/CreateItem";
import CreateCollection from "../../../pages/users/collection/CreateCollections";
import CreateCollectionForm from "./_forms/CreateCollection";


const CustomFormStepper: React.FC = () => {
	const [formData, setFormData] = React.useState<ICollection>({
		name: "",
		description: "",
		topic: "",
		tags: [],
		custom_fields: [
			{
				name: "",
				type: "",
			},
		],
		items: [
			{
				name: "",
			},
		],
	});

	const [message, setMessage] = useState<{
		severity: "error" | "success";
		text: string;
	} | null>(null);

	const [open, setOpen] = useState<boolean>(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleInputChange = (
		e:
			| React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
			| React.ChangeEvent<{ value: unknown; name: string }>
			| SelectChangeEvent<string>
	) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async () => {
		try {
			console.log("Form submitted:", formData);
			const collection = await createCollection(formData);
			console.log(collection);
			setMessage({ severity: "success", text: "Successfully created." });
			setOpen(true);
		} catch (error: any) {
			console.log("Error:", error);
			setMessage({ severity: "error", text: error.message });
			setOpen(true);
		}
	};

	const handleCustomFieldChange = (
		index: number,
		e:
			| React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
			| SelectChangeEvent<string>
	) => {
		const { name, value } =
			"target" in e ? e.target : { name: "", value: "" };
		const updatedFields = [...(formData.custom_fields as ICustomField[])];
		updatedFields[index] = { ...updatedFields[index], [name]: value };
		setFormData((prevState) => ({
			...prevState,
			custom_fields: updatedFields,
		}));
	};

	const addCustomField = () => {
		setFormData((prevState) => ({
			...prevState,
			custom_fields: [
				...(prevState.custom_fields as ICustomField[]),
				{ name: "", type: "" },
			],
		}));
	};

	const removeCustomField = (index: number) => {
		setFormData((prevState) => ({
			...prevState,
			custom_fields: prevState.custom_fields!.filter(
				(_, i) => i !== index
			),
		}));
	};

	// Items
	const handleItemInputChange = (
		index: number,
		e:
			| React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
			| SelectChangeEvent<string>
	) => {
		const { name, value } =
			"target" in e ? e.target : { name: "", value: "" };
		setFormData((prevState) => {
			if (prevState.items)
				prevState.items[index] = {
					...prevState.items[index],
					[name]: value,
				};
			console.log(prevState);
			return {
				...prevState,
			};
		});
	};

	const addItem = () => {
		setFormData((prevState) => ({
			...prevState,
			items: [
				...(prevState.items as IItem[]),
				{ name: "" }, // Add other default values based on your IItem structure
			],
		}));
	};

	const removeItem = (index: number) => {
		setFormData((prevState) => ({
			...prevState,
			items: prevState.items!.filter((_, i) => i !== index),
		}));
	};

	return (
		<>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<MuiAlert
					elevation={6}
					variant="filled"
					onClose={handleClose}
					severity={message?.severity}
				>
					{message?.text}
				</MuiAlert>
			</Snackbar>
			<Wizard initialValues={formData} onSubmit={handleSubmit}>
				<WizardStep>
					<CreateCollectionForm formData={formData} handleInputChange={handleInputChange}/>
				</WizardStep>
				<WizardStep>
					<CreateCustomFieldsForm
						handleCustomFieldChange={handleCustomFieldChange}
						addCustomField={addCustomField}
						removeCustomField={removeCustomField}
						formData={formData.custom_fields as ICustomField[]}
					/>
				</WizardStep>
				<WizardStep>
					<CreateItemForm
						customFields={formData.custom_fields as ICustomField[]}
						items={formData.items as IItem[]}
						handleInputChange={handleItemInputChange}
						removeItem={removeItem}
						addItem={addItem}
					/>
				</WizardStep>
			</Wizard>
		</>
	);
};

export default CustomFormStepper;
