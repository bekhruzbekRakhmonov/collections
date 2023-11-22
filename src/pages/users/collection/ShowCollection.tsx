import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCollection } from "../../../utils/api/users/collections";
import { IRowCollection } from "../../../utils/interfaces/collection";
import CollectionItemsCard from "../../../components/users/collections/show/CollectionItems";

const ShowCollection = () => {
	const { id } = useParams();
	const [data, setData] = useState<IRowCollection | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

	const handleDelete = () => {
		console.log("Item deleted!");
		setDeleteDialogOpen(false);
	};

	const handleOpenDeleteDialog = () => {
		setDeleteDialogOpen(true);
	};

	const handleCloseDeleteDialog = () => {
		setDeleteDialogOpen(false);
	};

	const fetchCollection = async () => {
		try {
			const collectionData: IRowCollection = await getCollection(Number(id));
			setData(collectionData);
			setError(null);
		} catch (error: any) {
			setData(null);
			setError(error.message);
		}
	};

	useEffect(() => {
		fetchCollection();
	}, [id]);

	return (
		<>{data && <CollectionItemsCard data={data} updateData={setData} handleCloseDeleteDialog={handleCloseDeleteDialog} handleOpenDeleteDialog={handleOpenDeleteDialog} handleDelete={handleDelete} />}</>
	);
};

export default ShowCollection;
