import React, { useEffect, useState } from "react";
import SimpleTable, { Column } from "../../../../components/admin/table/Table";
import { admin } from "../../../../utils/api/admin";
import { useNavigate } from "react-router-dom";
import { IRowCollection } from "../../../../utils/interfaces/collection";
import DeleteDialog from "../../../../components/users/collections/delete/DeleteDialog";
import { Button, TextField, FormControl, SelectChangeEvent, Box, MenuItem, Select } from "@mui/material";
import { collectionColumns, commentColumns } from "../../../../components/admin/table/columns";

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
	const [searchValue, setSearchValue] = useState<string>("");
	const [columnName, setColumnName] = useState<string>(commentColumns[0].id);
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
		const result = await admin.getCollections(
			columnName,
			searchValue,
			page,
			limit,
			order,
			orderBy
		);
		setCollectionsData(result);
	};

	const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const handleColumnName = (
		e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<string>
	) => {
		setColumnName(e.target.value);
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
						{collectionColumns.map((column) => (
							<MenuItem key={column.id} value={column.id}>
								{column.id}
							</MenuItem>
						))}
					</Select>
					<TextField value={searchValue} onChange={handleSearch} />
				</FormControl>
				<Button
					variant="contained"
					onClick={() => navigate("/admin/add-collection")}
				>
					Add Collection
				</Button>
			</Box>
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
		</div>
	);
};

export default CollectionsTable;
