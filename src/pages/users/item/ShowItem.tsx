import { useEffect, useState } from "react";
import { usersApi } from "../../../utils/api/users";
import { IRowCollection } from "../../../utils/interfaces/collection";
import { IRowItem } from "../../../utils/interfaces/item";
import CollectionItem from "../../../components/users/collections/show/CollectionItem";
import { useParams } from "react-router-dom";

const ShowItem = () => {
    const { itemId } = useParams();
	const [item, setItem] = useState(null);
	const [expanded, setExpanded] = useState(false);
	const [isLiked, setIsLiked] = useState(false);

	useEffect(() => {
		const fetchItem = async () => {
			try {
				const fetchedItem = await usersApi.getItem(String(itemId));
				setItem(fetchedItem);
				setIsLiked(checkIfUserLikedItem(fetchedItem));
			} catch (error) {
				console.error("Error fetching item:", error);
			}
		};

		fetchItem();
	}, [itemId]);

	const checkIfUserLikedItem = (item: IRowItem) => {
		// Implement the logic to check if the user liked the item
		// You may need to access the user's information from your authentication context
		// Return true if the user liked the item, otherwise return false
		return false;
	};

	const handleToggleLike = async () => {
		try {
			// Implement the logic to toggle the like status of the item
			// You may need to send a request to your API to update the like status
			// Update the state accordingly
			setIsLiked(!isLiked);
		} catch (error) {
			console.error("Error toggling like:", error);
		}
	};

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<div>
			{item && (
				<CollectionItem
					item={item}
                    itemIndex={0}
                    expandedItems={[]}
					isUserLikedItem={(index) => isLiked}
					handleToggleLike={handleToggleLike}
					handleExpandClick={handleExpandClick}
				/>
			)}
		</div>
	);
}

export default ShowItem;