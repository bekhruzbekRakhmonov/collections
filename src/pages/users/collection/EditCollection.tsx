import React, { useEffect, useState } from "react";
import { ICollection } from "../../../utils/interfaces/collection";
import { ICustomField, IRowCustomField } from "../../../utils/interfaces/custom-fields";
import { IItem } from "../../../utils/interfaces/item";
import EditCollectionComponent from "../../../components/users/collections/edit/EditCollectionsComponent";
import { usersApi } from "../../../utils/api/users";
import { useNavigate, useParams } from "react-router-dom";
import ErrorComponent from "../../../components/common/error/Error";

const EditCollection = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
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
			custom_fields: [
				{
					name: "",
					type: "",
					value: "",
				},
			],
		},
	]);

	const [removedCollectionCustomFieldsIds, setRemovedCollectionCustomFieldsIds] =
		React.useState<number[]>([]);
	const [removedItemsIds, setRemovedItemsIds] = React.useState<number[]>([]);
	const [removedItemCustomFieldsIds, setRemovedItemCustomFieldsIds] = React.useState<number[]>([]);

	const [itemCustomFields, setItemCustomFields] = React.useState<
		ICustomField[][] | IRowCustomField[][]
	>([
		[
			{
				name: "",
				type: "",
				value: "",
			},
		],
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
				};

				const customFields = data.custom_fields;

				let accumulatedItemCustomFields: IRowCustomField[][] = [];

				data.items.forEach((item, index) => {
					accumulatedItemCustomFields.push(
						item.custom_fields as IRowCustomField[]
					);
				});

				setCollection(collection);
				setItems(data.items as any);
				setCustomFields(customFields);
				accumulatedItemCustomFields.map((itemCustomField, index) => {
					setItemCustomFields((prev) => {
						prev[index] = itemCustomField;
						return prev;
					});
				});

			} catch (error: any) {
				setError(error.message);
				console.error(error.message);
			}
		})();
	}, [id]);


	const handleSubmit = async () => {
		const updatedCollection = await usersApi.updateCollection(Number(id),
			collection,
			customFields,
			removedCollectionCustomFieldsIds
		);

		const updatedItems = await usersApi.updateItems(
			updatedCollection.id,
			items,
			removedItemsIds
		);
		const updatedItemsIds = updatedItems.map(({ id }) => Number(id));
		await usersApi.updateCustomFields(
			updatedItemsIds,
			itemCustomFields,
			removedItemCustomFieldsIds
		);

		navigate(`/collection/${updatedCollection.id}`);
	};

	return (
		<>
			<ErrorComponent show={error ? true : false} errorMessage={error} />
			<EditCollectionComponent
				collection={collection}
				customFields={customFields}
				itemCustomFields={itemCustomFields}
				items={items as IItem[]}
				setCollection={setCollection}
				setCustomFields={setCustomFields}
				setItems={setItems}
				setItemCustomFields={setItemCustomFields}
				setRemovedItemsIds={setRemovedItemsIds}
				setRemovedItemCustomFieldsIds={setRemovedItemCustomFieldsIds}
				setRemovedCollectionCustomFieldsIds={
					setRemovedCollectionCustomFieldsIds
				}
				handleSubmit={handleSubmit}
			/>
		</>
	);
};

export default EditCollection;
