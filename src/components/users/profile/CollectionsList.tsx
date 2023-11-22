import React, { useEffect, useState, useRef } from "react";
import Typography from "@mui/material/Typography";
import { Box, List } from "@mui/material";
import { IRowCollection } from "../../../utils/interfaces/collection";
import Loading from "../../loading/Loading";
import CollectionCard from "../collections/show/CollectionCard";
import { usersApi } from "../../../utils/api/users";

interface UserCollectionsListProps {
    userId: number;
	handleOpenDeleteDialog: () => void;
	handleCloseDeleteDialog: () => void;
	handleDelete: () => void;
}

const UserCollectionsList: React.FC<UserCollectionsListProps> = ({
    userId,
	handleCloseDeleteDialog,
	handleOpenDeleteDialog,
	handleDelete,
}) => {
	const [collections, setCollections] = useState<IRowCollection[]>([]);
	const [error, setError] = useState<string>();
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const observer = useRef<IntersectionObserver | null>(null);
	const sentinelRef = useRef<HTMLDivElement>(null);

	const fetchCollections = async (pageNumber: number) => {
		try {
			setLoading(true);
			const data = await usersApi.getCollectionsByUserId(userId, pageNumber);
            if (data.length > 0) {
                setCollections((prevCollections) => [...prevCollections, ...data]);
                setPage((prevPage) => prevPage + 1);
            }
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: "0px",
			threshold: 1.0,
		};

		observer.current = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					fetchCollections(page);
				}
			});
		}, options);

		if (sentinelRef.current) {
			observer.current.observe(sentinelRef.current);
		}

		return () => {
			if (observer.current) {
				observer.current.disconnect();
			}
		};
	}, [page]);

	useEffect(() => {
		fetchCollections(page);
	}, []);

	return (
		<div>
			{error ? (
				<Box
					textAlign="center"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<Typography variant="h4" color="red">
						{error}
					</Typography>
				</Box>
			) : (
				<List>
					{collections.map((collection: IRowCollection, index) => (
						<CollectionCard
							key={index}
							data={collection}
							handleCloseDeleteDialog={handleCloseDeleteDialog}
							handleOpenDeleteDialog={handleOpenDeleteDialog}
							handleDelete={handleDelete}
						/>
					))}
					<div ref={sentinelRef} style={{ height: "10px" }} />
					{loading && <Loading />}
				</List>
			)}
		</div>
	);
};

export default UserCollectionsList;
