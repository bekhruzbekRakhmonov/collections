import React, { useEffect, useState, useRef } from "react";
import { List, Typography } from "@mui/material";
import { IRowCollection } from "../../../utils/interfaces/collection";
import Loading from "../../common/loading/Loading";
import CollectionCard from "../collections/show/CollectionCard";
import { usersApi } from "../../../utils/api/users";
import ErrorComponent from "../../common/error/Error";

interface UserCollectionsListProps {
    userId: number;
}

const UserCollectionsList: React.FC<UserCollectionsListProps> = ({
    userId,
}) => {
	const [collections, setCollections] = useState<IRowCollection[]>([]);
	const [error, setError] = useState<string | null>(null);
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

	const handleDelete = async (id: number) => {
		try {

			await usersApi.deleteCollection(id);
			setCollections((prevCollections) =>
				prevCollections.filter((collection) => collection.id !== id)
			);
		} catch (error: any) {
			console.error(error.message);
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

	return (
		<div>
			<ErrorComponent
				show={error !== null}
				errorMessage={String(error)}
			/>
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
		</div>
	);
};

export default UserCollectionsList;
