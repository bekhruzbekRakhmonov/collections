import React, { useEffect, useState } from "react";
import SimpleTable, { Column } from "../../../../components/admin/table/Table";
import { admin } from "../../../../utils/api/admin";
import { useNavigate } from "react-router-dom";
import { IRowCollection } from "../../../../utils/interfaces/collection";
import DeleteDialog from "../../../../components/users/collections/delete/DeleteDialog";

const collectionColumns: Column[] = [
	{ id: "id", label: "ID" },
	{ id: "name", label: "Name" },
	{ id: "description", label: "Description" },
];
interface IResult {
	data: IRowCollection[];
	total: number;
}

const CollectionsTable: React.FC = () => {
	const navigate = useNavigate();

	const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
	const [preDeletedItemId, setPreDeletedItemId] = useState<number | null>(
		null
	);
	const [collectionsData, setCollectionsData] = useState<IResult>({
		data: [],
		total: 0,
	});

	const getCollections = async (
		page?: number,
		limit?: number,
		order?: string,
		orderBy?: string
	) => {
		const result = await admin.getCollections(page, limit, order, orderBy);
		setCollectionsData(result);
	};

	const handleDelete = async () => {
		try {
			if (preDeletedItemId) {
				await admin.deleteCollection(preDeletedItemId);
				setCollectionsData((prevResult) => ({
					data: prevResult.data.filter(
						(_, i) => prevResult.data[i].id !== preDeletedItemId
					),
					total: prevResult.total - 1,
				}));

				if (collectionsData.data.length === 1) {
					await getCollections();
				}
			}
		} catch (error: any) {
			console.error(error.message);
		} finally {
			setOpenDeleteDialog(false);
		}
	};

	const handleDeleteDialogOpenClose = () => {
		setOpenDeleteDialog(!openDeleteDialog);
	};

	useEffect(() => {
		getCollections();
	}, []);

	return (
		<>
			<DeleteDialog
				open={openDeleteDialog}
				onClose={handleDeleteDialogOpenClose}
				onDelete={handleDelete}
			/>
			<SimpleTable
				key="collections"
				result={collectionsData}
				columns={collectionColumns}
				containerStyle={{ marginTop: "60px" }}
				onEdit={(id) => navigate(`/admin/edit-collection/${id}`)}
				onDelete={(id) => {
					handleDeleteDialogOpenClose();
					setPreDeletedItemId(id);
				}}
				refreshData={getCollections}
			/>
		</>
	);
};

export default CollectionsTable;
