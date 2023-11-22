import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface DeleteDialogProps {
	open: boolean;
	onClose: () => void;
	onDelete: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
	open,
	onClose,
	onDelete,
}) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Delete Confirmation</DialogTitle>
			<DialogContent>
				<p>Are you sure you want to delete this item?</p>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary">
					Cancel
				</Button>
				<Button onClick={onDelete} color="warning">
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteDialog;
