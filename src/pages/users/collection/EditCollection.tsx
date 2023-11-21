import React, { useEffect } from "react";
import { ICollection } from "../../../utils/interfaces/collection";
import { ICustomField } from "../../../utils/interfaces/custom-fields";
import { IItem } from "../../../utils/interfaces/item";
import EditCollectionComponent from "../../../components/users/collections/edit/EditCollectionsComponent";
import { usersApi } from "../../../utils/api/users";
import { useParams } from "react-router-dom";

const EditCollection = () => {
	const { id } = useParams();
	const [collection, setCollection] = React.useState<ICollection>({
		name: "",
		description: "",
		topic: "",
		photo: "",
	});
	const [customFields, setCustomFields] = React.useState<ICustomField[]>([
		{
			name: "",
			type: "",
		},
	]);
	const [items, setItems] = React.useState<IItem[]>([
		{
			name: "",
			tags: "",
			custom_fields: []
		},
	]);

	const [itemCustomFields, setItemCustomFields] = React.useState<
		ICustomField[]
	>([]);

	useEffect(() => {
		(async () => {
			try {
				const data = await usersApi.getCollection(id as string);
				const collection: ICollection = {
					name: data.name,
					description: data.description,
					topic: data.topic,
					photo: data.photo,
				}

				const items = data.items as IItem[];
				const customFields = data.custom_fields;

				let accumulatedItemCustomFields: ICustomField[] = [];
				
				items.forEach((item) => {
					item.custom_fields?.forEach((field) => {
						console.log(1);
						accumulatedItemCustomFields.push(field);
					});
				});

				setCollection(collection);
				setItems(items);
				setCustomFields(customFields);
				setItemCustomFields(accumulatedItemCustomFields);
			} catch (error: any) {
				console.error(error.message)
			}
		})()
	}, [id])

	const handleSubmit = () => {
		console.log("Submitted");
		console.log(collection);
		console.log(customFields);
		console.log(items);
		console.log(itemCustomFields);
	};

	return (
		<EditCollectionComponent
			collection={collection}
			customFields={customFields}
			itemCustomFields={itemCustomFields}
			items={items}
			setCollection={setCollection}
			setCustomFields={setCustomFields}
			setItems={setItems}
			setItemCustomFields={setItemCustomFields}
			handleSubmit={handleSubmit}
		/>
	);
};

export default EditCollection;
