import React, { useEffect, useState, useRef } from "react";
import Typography from "@mui/material/Typography";
import { Box, List } from "@mui/material";
import { getCollections } from "../../../../utils/api/users/collections";
import CollectionCard from "./CollectionCard";
import { IRowCollection } from "../../../../utils/interfaces/collection";
import Loading from "../../../loading/Loading";

interface CollectionsListProps {
	handleDelete: (id: number) => void;
	fetchCollections: (pageNumber: number) => void;
	error: string | undefined;
	collections: IRowCollection[];
	loading: boolean;
	page: number
}

const CollectionsList: React.FC<CollectionsListProps> = ({ handleDelete, fetchCollections, error, collections, loading, page }) => {

	const observer = useRef<IntersectionObserver | null>(null);
	const sentinelRef = useRef<HTMLDivElement>(null);

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
	}, []); // Initial fetch

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
							handleDelete={handleDelete}
						/>
					))}
					<div ref={sentinelRef} style={{ height: "10px" }} />
					{loading && <Loading />}
				</List>
			)}
		</div>
	);
}

export default CollectionsList;