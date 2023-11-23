import React, { useEffect } from "react";
import { ICollection } from "../../../utils/interfaces/collection";
import { ICustomField } from "../../../utils/interfaces/custom-fields";
import { IItem } from "../../../utils/interfaces/item";
import EditCollectionComponent from "../../../components/users/collections/edit/EditCollectionsComponent";
import { usersApi } from "../../../utils/api/users";
import { useNavigate, useParams } from "react-router-dom";

const EditCollection = () => {
	const { id } = useParams();
	const navigate = useNavigate();
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
		ICustomField[][]
	>([
		[{
			name: "",
			type: "",
			value: "",
		},]
	]);

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

				const customFields = data.custom_fields;

				let accumulatedItemCustomFields: ICustomField[][] = [];
				
				data.items.forEach((item, index) => {
					accumulatedItemCustomFields.push(item.custom_fields as ICustomField[]);
				});

				setCollection(collection);
				setItems(data.items as any);
				setCustomFields(customFields);
				setItemCustomFields(accumulatedItemCustomFields);
			} catch (error: any) {
				console.error(error.message)
			}
		})()
	}, [id])

	const handleSubmit = async () => {
		const updatedCollection = await usersApi.updateCollection(Number(id), {
			collection,
			customFields,
		});
		const updatedItems = await usersApi.updateItems(
			updatedCollection.id,
			items
		);
		const updatedItemsIds = updatedItems.map(({ id }) => Number(id));
		await usersApi.updateCustomFields(
			updatedItemsIds,
			itemCustomFields
		);

		navigate(`/show-collection/${updatedCollection.id}`);
	};

	return (
		<EditCollectionComponent
			collection={collection}
			customFields={customFields}
			itemCustomFields={itemCustomFields}
			items={items as IItem[]}
			setCollection={setCollection}
			setCustomFields={setCustomFields}
			setItems={setItems}
			setItemCustomFields={setItemCustomFields}
			handleSubmit={handleSubmit}
		/>
	);
};

export default EditCollection;
