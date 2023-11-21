import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCollection } from "../../../utils/api/users/collections";
import { ICollection, IRowCollection } from "../../../utils/interfaces/collection";
import ErrorComponent from "../../../components/error/Error";
import CollectionItemsCard from "../../../components/users/collections/show/CollectionItems";
import { IItem, IRowItem } from "../../../utils/interfaces/item";

const ShowCollection = () => {
	const { id } = useParams();
	const [data, setData] = useState<IRowCollection | null>(null); // Initialize data as null
	const [error, setError] = useState<string | null>(null); // Initialize error as null

	const fetchCollection = async () => {
		try {
			const collectionData: IRowCollection = await getCollection(Number(id));
			setData(collectionData);
			setError(null); // Reset error on successful fetch
		} catch (error: any) {
			setData(null); // Reset data on error
			setError(error.message);
		}
	};

	useEffect(() => {
		fetchCollection();
	}, [id]); // Run the effect only when the id parameter changes

	return (
		<Container>
			{data ? (
				<CollectionItemsCard data={data} onEditCollection={(coll: IRowCollection) => console.log(coll)} onEditItem={(item: IRowItem)=>console.log(item)} onDeleteCollection={(collId) => console.log(collId)} onDeleteItem={(itemId) => console.log(itemId)}/>
			) : (
				<ErrorComponent errorMessage={error as string} />
			)}
		</Container>
	);
};

export default ShowCollection;
