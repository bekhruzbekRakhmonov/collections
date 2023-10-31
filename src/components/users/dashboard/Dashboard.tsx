import React, { useState } from "react";
import * as api from "../../../utils/api";
import { useAuth } from "../../../auth/AuthContext";
import ResponsiveAppBar from "../appbar/AppBar";
import Collection from "../collections/Collections";
import CollectionForm from "../collections/CollectionForm";
import { Fab, Modal, Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";

const DashboardComponent: React.FC = () => {
	const { isAuthenticated } = useAuth();
	const [openForm, setOpenForm] = useState(false);

	const handleFormOpen = () => {
		setOpenForm(true);
	};

	const handleFormClose = () => {
		setOpenForm(false);
	};

	const handleSubmit = (formData: any) => {
		// Handle form submission logic using the API (api.createCollection(formData))
		// Close the form after successful submission
		handleFormClose();
	};

	return (
		<>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					position: "relative", // Set the position of the container to relative
				}}
			>
				<Collection />
				{!isAuthenticated && (
					<>
						<Modal open={openForm} onClose={handleFormClose}>
							<Box
								sx={{
									position: "absolute",
									top: "50%",
									left: "50%",
									transform: "translate(-50%, -50%)",
									width: 500,
									bgcolor: "background.paper",
									border: "2px solid #000",
									boxShadow: 24,
									p: 4,
								}}
							>
								<CollectionForm onSubmit={handleSubmit} />
								<Button onClick={handleFormClose}>
									Cancel
								</Button>
							</Box>
						</Modal>
						<Fab
							color="primary"
							aria-label="add"
							onClick={handleFormOpen}
							style={{
								position: "fixed", // Set the position to fixed
								bottom: 16, // Adjust the bottom value as needed
								right: 16, // Adjust the right value as needed
							}}
						>
							<Add />
						</Fab>
					</>
				)}
			</div>
		</>
	);
};

export default DashboardComponent;
