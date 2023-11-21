import * as React from "react";
import { Container } from "@mui/material";
import CreateCollectionComponent from "../../../components/users/collections/create/CreateCollectionComponent";
import { ICollection } from "../../../utils/interfaces/collection";
import { ICustomField } from "../../../utils/interfaces/custom-fields";
import { IItem } from "../../../utils/interfaces/item";
import { usersApi } from "../../../utils/api/users";
import { useNavigate } from "react-router-dom";

const CreateCollection = () => {
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
		},
	]);

    const [itemCustomFields, setItemCustomFields] = React.useState<
		ICustomField[]
	>([
		{
			name: "",
			type: "",
            value: "",
		},
	]);

    const handleSubmit = async () => {
        console.log("Submitted")
        console.log(collection);
        console.log(customFields);
        console.log(items);
        console.log(itemCustomFields);
        try {
            const newCollection = await usersApi.createCollection({collection, customFields, itemCustomFields, items})
            navigate(`/show-collection/${newCollection.id}`);
        } catch (error: any) {
            console.error(error.message)
        }
    }

	return (
		<CreateCollectionComponent
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

export default CreateCollection;
