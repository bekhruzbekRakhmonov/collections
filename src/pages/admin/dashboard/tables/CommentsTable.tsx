import React, { useEffect, useState } from "react";
import SimpleTable, { Column } from "../../../../components/admin/table/Table";
import { admin } from "../../../../utils/api/admin";
import { useNavigate } from "react-router-dom";
import { IRowComment } from "../../../../utils/interfaces/comment";
import DeleteDialog from "../../../../components/users/collections/delete/DeleteDialog";

const commentColumns: Column[] = [
	{ id: "id", label: "ID" },
	{ id: "owner", label: "Author" },
	{ id: "content", label: "Content" },
];

const CommentsTable: React.FC = () => {
	const navigate = useNavigate();

	const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
	const [preDeletedItemId, setPreDeletedItemId] = useState<number | null>(
		null
	);
	const [commentsData, setCommentsData] = React.useState<{
		data: IRowComment[];
		total: number;
	}>({ data: [], total: 0 });

	const getComments = async (
		page?: number,
		limit?: number,
		order?: string,
		orderBy?: string
	) => {
		const result = await admin.getComments(page, limit, order, orderBy);
		setCommentsData(result);
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
	}, []);

	return (
		<>
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
		</>
	);
};

export default CommentsTable;
