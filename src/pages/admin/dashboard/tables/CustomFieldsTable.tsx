import React, { useEffect, useState } from "react";
import SimpleTable, { Column } from "../../../../components/admin/table/Table";
import { admin } from "../../../../utils/api/admin";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../../../../components/users/collections/delete/DeleteDialog";
import { Button } from "@mui/material";
import { IRowCustomField } from "../../../../utils/interfaces/custom-fields";

const customFieldColumns: Column[] = [
	{ id: "id", label: "ID" },
	{ id: "name", label: "Name" },
	{ id: "type", label: "Type" },
	{ id: "value", label: "Value" },
];

const CustomFieldsTable: React.FC = () => {
	const navigate = useNavigate();

	const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
	const [preDeletedItemId, setPreDeletedItemId] = useState<number | null>(
		null
	);
	const [customFieldsData, setCustomFieldsData] = React.useState<{
		data: IRowCustomField[];
		total: number;
	}>({ data: [], total: 0 });

	const getCustomFields = async (
		page?: number,
		limit?: number,
		order?: string,
		orderBy?: string
	) => {
		const result = await admin.getCustomFields(page, limit, order, orderBy);
        console.log("result", result)
		setCustomFieldsData(result);
	};

	const handleDelete = async () => {
		try {
			if (preDeletedItemId) {
				await admin.deleteCollection(preDeletedItemId);
				setCustomFieldsData((prevResult) => ({
					data: prevResult.data.filter(
						(_, i) => prevResult.data[i].id !== preDeletedItemId
					),
					total: prevResult.total - 1,
				}));
				if (customFieldsData.data.length === 1) {
					await getCustomFields();
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
		getCustomFields();
        console.log(customFieldsData)
	}, []);

	return (
		<div>
			<Button
				variant="contained"
				sx={{ float: "right", margin: "10px" }}
				onClick={() => navigate("/admin/add-custom-field")}
			>
				Add Custom Field
			</Button>
			<DeleteDialog
				open={openDeleteDialog}
				onClose={handleDeleteDialogOpenClose}
				onDelete={handleDelete}
			/>
			<SimpleTable
				key="customfields"
				result={customFieldsData}
				columns={customFieldColumns}
				containerStyle={{ marginTop: "60px" }}
				onEdit={(id) => navigate(`/admin/edit-custom-field/${id}`)}
				onDelete={(id) => {
					handleDeleteDialogOpenClose();
					setPreDeletedItemId(id);
				}}
				refreshData={getCustomFields}
			/>
		</div>
	);
};

export default CustomFieldsTable;
