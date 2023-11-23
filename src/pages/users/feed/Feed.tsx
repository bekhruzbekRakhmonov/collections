import React, { useState } from "react";
import { useAuth } from "../../../auth/AuthContext";
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CollectionsList from "../../../components/users/collections/show/CollectionsList";
import { usersApi } from "../../../utils/api/users";
import { IRowCollection } from "../../../utils/interfaces/collection";

const Feed: React.FC = () => {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const [collections, setCollections] = useState<IRowCollection[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const fetchCollections = async (pageNumber: number) => {
		try {
			setLoading(true);
			const data = await usersApi.getCollections(pageNumber);
			if (data.length > 0) {
				setCollections((prevCollections) => [...prevCollections, ...data]);
				setPage((prevPage) => prevPage + 1);
			} else {
				setError("No collections yet")
			}
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: number) => {
		try {
			await usersApi.deleteCollection(id);
			setCollections((prevCollections) =>
				prevCollections.filter((collection) => collection.id !== id)
			);
		} catch (error: any) {
			console.error(error.message);
		}
	}

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				position: "relative",
			}}
		>
			<CollectionsList handleDelete={handleDelete} fetchCollections={fetchCollections} collections={collections} error={error} page={page} loading={loading}/>
			{isAuthenticated && (
				<>
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
