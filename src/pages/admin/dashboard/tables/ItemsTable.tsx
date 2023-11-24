import React, { useEffect, useState } from "react";
import SimpleTable, { Column } from "../../../../components/admin/table/Table";
import { admin } from "../../../../utils/api/admin";
import { useNavigate } from "react-router-dom";
import { IRowItem } from "../../../../utils/interfaces/item";
import DeleteDialog from "../../../../components/users/collections/delete/DeleteDialog";

const itemColumns: Column[] = [
	{ id: "id", label: "ID" },
	{ id: "name", label: "Name" },
	{ id: "tags", label: "Tags" },
];

const ItemsTable: React.FC = () => {
	const navigate = useNavigate();

	const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
	const [preDeletedItemId, setPreDeletedItemId] = useState<number | null>(null)
	const [itemsData, setItemsData] = useState<{
		data: IRowItem[];
		total: number;
	}>({ data: [], total: 0 });

    const getItems = async (
		page?: number,
		limit?: number,
		order?: string,
		orderBy?: string
	) => {
			const result = await admin.getItems(
				page,
				limit,
				order,
				orderBy
			);
			setItemsData(result);
	};

	const handleDelete = async () => {
		try {
			if (preDeletedItemId) {
				await admin.deleteItem(preDeletedItemId);
				setItemsData((prevResult) => ({
					data: prevResult.data.filter(
						(_, i) => prevResult.data[i].id !== preDeletedItemId
					),
					total: prevResult.total - 1,
				}));
				if (itemsData.data.length === 1) {
					await getItems();
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
	}

	useEffect(() => {
		getItems();
	}, []);

	return (
		<>
			<DeleteDialog
				open={openDeleteDialog}
				onClose={handleDeleteDialogOpenClose}
				onDelete={handleDelete}
			/>
			<SimpleTable
				key="items"
				result={itemsData}
				columns={itemColumns}
				containerStyle={{ marginTop: "60px" }}
				onEdit={(id) => navigate(`/admin/edit-item/${id}`)}
				onDelete={(id) => {
					handleDeleteDialogOpenClose();
					setPreDeletedItemId(id);
				}}
				refreshData={getItems}
			/>
		</>
	);
};

export default ItemsTable;
