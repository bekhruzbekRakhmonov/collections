import React, { useEffect, useState } from "react";
import SimpleTable, { Column } from "../../../../components/admin/table/Table";
import { admin } from "../../../../utils/api/admin";
import { useNavigate } from "react-router-dom";
import { IRowItem } from "../../../../utils/interfaces/item";
import DeleteDialog from "../../../../components/users/collections/delete/DeleteDialog";
import {
	Box,
	Button,
	FormControl,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
} from "@mui/material";
import { itemColumns } from "../../../../components/admin/table/columns";

const ItemsTable: React.FC = () => {
	const navigate = useNavigate();

	const [columnName, setColumnName] = useState<string>(itemColumns[0].id);
	const [searchValue, setSearchValue] = useState<string>("");
	const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
	const [preDeletedItemId, setPreDeletedItemId] = useState<number | null>(
		null
	);
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
		const result = await admin.getItems(columnName, searchValue, page, limit, order, orderBy);
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
	};

	const handleColumnName = (e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<string>) => {
		setColumnName(e.target.value);
	};

	const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	useEffect(() => {
		getItems();
	}, [searchValue]);

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
						{itemColumns.map((column) => (
							<MenuItem key={column.id} value={column.id}>
								{column.id}
							</MenuItem>
						))}
					</Select>
					<TextField value={searchValue} onChange={handleSearch} />
				</FormControl>
				<Button
					variant="contained"
					onClick={() => navigate("/admin/add-user")}
				>
					Add Item
				</Button>
			</Box>
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
		</div>
	);
};

export default ItemsTable;
