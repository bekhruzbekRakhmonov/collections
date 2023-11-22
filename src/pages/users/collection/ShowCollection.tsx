import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCollection } from "../../../utils/api/users/collections";
import { IRowCollection } from "../../../utils/interfaces/collection";
import CollectionItemsCard from "../../../components/users/collections/show/CollectionItems";
import DeleteDialog from "../../../components/users/collections/delete/DeleteDialog";

const ShowCollection = () => {
	const { id } = useParams();
	const [data, setData] = useState<IRowCollection | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

	const handleDelete = (id: number) => {
		console.log("Item deleted!", id);
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
		<>
			<DeleteDialog
				open={isDeleteDialogOpen}
				onClose={handleCloseDeleteDialog}
				onDelete={() => handleDelete(data?.id as number)}
			/>
			{data && (
				<CollectionItemsCard
					data={data}
					updateData={setData}
					handleCloseDeleteDialog={handleCloseDeleteDialog}
					handleOpenDeleteDialog={handleOpenDeleteDialog}
					handleDelete={handleDelete}
				/>
			)}
		</>
	);
};

export default ShowCollection;
