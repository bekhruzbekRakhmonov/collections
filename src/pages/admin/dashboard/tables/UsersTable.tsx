import React, { useEffect, useState } from "react";
import SimpleTable, { Column } from "../../../../components/admin/table/Table";
import { IRowUser } from "../../../../utils/interfaces/user";
import { admin } from "../../../../utils/api/admin";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../../../../components/users/collections/delete/DeleteDialog";

const userColumns: Column[] = [
	{ id: "id", label: "ID" },
	{ id: "name", label: "Name" },
	{ id: "email", label: "Email" },
	{ id: "role", label: "Role" },
	{ id: "status", label: "Status" },
	{ id: "created_at", label: "Joined" },
];

const UsersTable: React.FC = () => {
	const navigate = useNavigate();

	const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
	const [preDeletedItemId, setPreDeletedItemId] = useState<number | null>(
		null
	);
	const [usersData, setUsersData] = useState<{
		data: IRowUser[];
		total: number;
	}>({ data: [], total: 0 });

	const getUsers = async (
		page?: number,
		limit?: number,
		order?: string,
		orderBy?: string
	) => {
		const result = await admin.getUsers(page, limit, order, orderBy);
		setUsersData(result);
	};

	useEffect(() => {
		getUsers();
	}, []);
	const handleDelete = async () => {
		try {
			if (preDeletedItemId) {
				await admin.deleteItem(preDeletedItemId);
				setUsersData((prevResult) => ({
					data: prevResult.data.filter(
						(_, i) => prevResult.data[i].id !== preDeletedItemId
					),
					total: prevResult.total - 1,
				}));
				if (usersData.data.length === 1) {
					await getUsers();
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

	return (
		<>
			<DeleteDialog
				open={openDeleteDialog}
				onClose={handleDeleteDialogOpenClose}
				onDelete={handleDelete}
			/>
			<SimpleTable
				key="users"
				result={usersData}
				columns={userColumns}
				containerStyle={{ marginTop: "60px" }}
				onEdit={(id) => navigate(`/admin/edit-user/${id}`)}
				onDelete={(id) => {
					handleDeleteDialogOpenClose()
					setPreDeletedItemId(id);
				}}
				refreshData={getUsers}
			/>
		</>
	);
};

export default UsersTable;
