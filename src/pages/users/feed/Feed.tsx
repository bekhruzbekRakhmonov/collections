import React, { useState } from "react";
import { useAuth } from "../../../auth/AuthContext";
import Collection from "../../../components/users/collections/show/CollectionsList";
import { Fab, Modal, Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Feed: React.FC = () => {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					position: "relative",
				}}
			>
				<Collection />
				{isAuthenticated && (
					<>
						<Fab
							color="primary"
							aria-label="add"
							onClick={() => navigate('/create-collection')}
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
