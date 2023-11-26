import React, { useEffect, useState, useRef } from "react";
import Typography from "@mui/material/Typography";
import { Box, List } from "@mui/material";
import { getCollections } from "../../../../utils/api/users/collections";
import CollectionCard from "./CollectionCard";
import { IRowCollection } from "../../../../utils/interfaces/collection";
import Loading from "../../../common/loading/Loading";
import ErrorComponent from "../../../common/error/Error";

interface CollectionsListProps {
	handleDelete: (id: number) => void;
	fetchCollections: (pageNumber: number) => void;
	error: string | null;
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

	return (
		<div>
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
			<ErrorComponent
				show={error !== null}
				errorMessage={String(error)}
			/>
		</div>
	);
}

export default CollectionsList;