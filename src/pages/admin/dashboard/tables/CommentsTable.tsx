import React, { useEffect, useState } from "react";
import SimpleTable, { Column } from "../../../../components/admin/table/Table";
import { admin } from "../../../../utils/api/admin";
import { useNavigate } from "react-router-dom";
import { IRowComment } from "../../../../utils/interfaces/comment";
import DeleteDialog from "../../../../components/users/collections/delete/DeleteDialog";
import {
	Button,
	TextField,
	Select,
	MenuItem,
	FormControl,
	SelectChangeEvent,
	Box,
} from "@mui/material";
import { commentColumns, customFieldColumns } from "../../../../components/admin/table/columns";

const CommentsTable: React.FC = () => {
	const navigate = useNavigate();

	const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
	const [preDeletedItemId, setPreDeletedItemId] = useState<number | null>(
		null
	);
	const [commentsData, setCommentsData] = useState<{
		data: IRowComment[];
		total: number;
	}>({ data: [], total: 0 });

	const [searchValue, setSearchValue] = useState<string>("");
	const [columnName, setColumnName] = useState<string>(commentColumns[0].id);

	const getComments = async (
		page?: number,
		limit?: number,
		order?: string,
		orderBy?: string
	) => {
		const result = await admin.getComments(
			columnName,
			searchValue,
			page,
			limit,
			order,
			orderBy
		);
		setCommentsData(result);
	};

	const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const handleColumnName = (e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<string>) => {
		setColumnName(e.target.value);
	};

	const handleDelete = async () => {
		try {
			if (preDeletedItemId) {
				await admin.deleteCollection(preDeletedItemId);
				setCommentsData((prevResult) => ({
					data: prevResult.data.filter(
						(_, i) => prevResult.data[i].id !== preDeletedItemId
					),
					total: prevResult.total - 1,
				}));
				if (commentsData.data.length === 1) {
					await getComments();
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
		getComments();
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
						{commentColumns.map((column) => (
							<MenuItem key={column.id} value={column.id}>
								{column.id}
							</MenuItem>
						))}
					</Select>
					<TextField value={searchValue} onChange={handleSearch} />
				</FormControl>
				<Button
					variant="contained"
					onClick={() => navigate("/admin/add-comment")}
				>
					Add Comment
				</Button>
			</Box>
			<DeleteDialog
				open={openDeleteDialog}
				onClose={handleDeleteDialogOpenClose}
				onDelete={handleDelete}
			/>
			<SimpleTable
				key="comments"
				result={commentsData}
				columns={commentColumns}
				containerStyle={{ marginTop: "60px" }}
				onEdit={(id) => navigate(`/admin/edit-comment/${id}`)}
				onDelete={(id) => {
					handleDeleteDialogOpenClose();
					setPreDeletedItemId(id);
				}}
				refreshData={getComments}
			/>
		</div>
	);
};

export default CommentsTable;
