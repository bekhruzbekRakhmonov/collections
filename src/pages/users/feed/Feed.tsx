import React, { useState } from "react";
import { useAuth } from "../../../auth/AuthContext";
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CollectionsList from "../../../components/users/collections/show/CollectionsList";
import DeleteDialog from "../../../components/users/collections/delete/DeleteDialog";

const Feed: React.FC = () => {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

	const handleDelete = () => {
		console.log("Item deleted!");
		setDeleteDialogOpen(false);
	};

	const handleOpenDeleteDialog = () => {
		setDeleteDialogOpen(true);
	};

	const handleCloseDeleteDialog = () => {
		setDeleteDialogOpen(false);
	};

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				position: "relative",
			}}
		>
			<CollectionsList
				handleCloseDeleteDialog={handleCloseDeleteDialog}
				handleOpenDeleteDialog={handleOpenDeleteDialog}
				handleDelete={handleDelete}
			/>
			{isAuthenticated && (
				<>
					<DeleteDialog
						open={isDeleteDialogOpen}
						onClose={handleCloseDeleteDialog}
						onDelete={handleDelete}
					/>
					<Fab
						color="primary"
						aria-label="add"
						onClick={() => navigate("/create-collection")}
						style={{
							position: "fixed",
							bottom: 16,
							right: 16,
						}}
					>
						<Add />
					</Fab>
				</>
			)}
		</div>
	);
};

export default Feed;
