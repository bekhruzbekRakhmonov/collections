import React, { useEffect, useState } from "react";
import SimpleTable, { Column } from "../../../../components/admin/table/Table";
import { IRowUser } from "../../../../utils/interfaces/user";
import { admin } from "../../../../utils/api/admin";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../../../../components/users/collections/delete/DeleteDialog";
import { Box, Button, Container, FormControl, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { userColumns } from "../../../../components/admin/table/columns";

const UsersTable: React.FC = () => {
	const navigate = useNavigate();

	const [columnName, setColumnName] = useState<string>(userColumns[0].id)
	const [searchValue, setSearchValue] = useState<string>("");

	const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
	const [preDeletedItemId, setPreDeletedItemId] = useState<number | null>(
		null
	);
	const [usersData, setUsersData] = useState<{
		data: IRowUser[];
		total: number;
	}>({ data: [], total: 0 });

	const handleColumnName = (e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<string>) => {
		setColumnName(e.target.value);
	}

	const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(typeof e.target.value);
		setSearchValue(e.target.value)
	}

	const getUsers = async (
		page?: number,
		limit?: number,
		order?: string,
		orderBy?: string
	) => {
		const result = await admin.getUsers(columnName, searchValue, page, limit, order, orderBy);
		setUsersData(result);
	};

	useEffect(() => {
		getUsers();
	}, [searchValue]);
	
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
		<div>
			<Box
				sx={{
					marginTop: "60px",
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<FormControl sx={{ display: "flex", flexDirection: "row" }}>
					<Select value={columnName} onChange={handleColumnName}>
						{userColumns.map((column) => (
							<MenuItem key={column.id} value={column.id}>
								{column.id}
							</MenuItem>
						))}
					</Select>
					<TextField value={searchValue} onChange={handleSearch} />
				</FormControl>
				<Button
					variant="contained"
					// sx={{ float: "right", margin: "10px" }}
					onClick={() => navigate("/admin/add-user")}
				>
					Add User
				</Button>
			</Box>
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
					handleDeleteDialogOpenClose();
					setPreDeletedItemId(id);
				}}
				refreshData={getUsers}
			/>
		</div>
	);
};

export default UsersTable;
