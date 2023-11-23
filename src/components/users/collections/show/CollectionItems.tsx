import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { IRowCollection } from "../../../../utils/interfaces/collection";
import { usersApi } from "../../../../utils/api/users";
import { useAuth } from "../../../../auth/AuthContext";
import api from "../../../../utils/api/api";
import CollectionCardHeader from "./CollectionCardHeader";

import CollectionItem from "./CollectionItem";
import CollectionCard from "./CollectionCard";

interface CollectionItemsCardProps {
	data: IRowCollection;
	updateData: (data: React.SetStateAction<IRowCollection | null>) => void;
	handleDelete: (id: number) => void;
}
const CollectionItemsCard: React.FC<CollectionItemsCardProps> = ({
	data,
	updateData,
	handleDelete,
}) => {
	const { user } = useAuth();

	const [expandedItems, setExpandedItems] = useState<number[]>([]);

	const handleExpandClick = (itemId: number) => {
		setExpandedItems((prevExpandedItems) => {
			if (prevExpandedItems.includes(itemId)) {
				return prevExpandedItems.filter((id) => id !== itemId);
			} else {
				return [...prevExpandedItems, itemId];
			}
		});
	};


	const handleToggleLike = async (id: number) => {
		try {
			const updatedItem = await usersApi.likeOrUnlikeItem(id);
			const itemIndex = data.items.findIndex(
				(item) => item.id === updatedItem.id
			);

			const updatedItems = [...data.items];
			updatedItems[itemIndex] = updatedItem;
			updateData((data) => ({
				...data as IRowCollection,
				items: updatedItems,
			}));
		} catch (error) {
			console.error("Error toggling like:", error);
		}
	};

	const isUserLikedItem = (index: number) => {
		let liked = false;
		data.items[index].likes!.map((like) => {
			if (like.owner.id === user.id) {
				liked = true
			}
		})
		return liked;
	};

	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<Card
				sx={{ marginTop: "15px", maxWidth: "600px", minWidth: "300px" }}
			>
				<CollectionCard data={data} handleDelete={handleDelete}/>
				{data.items.map((item, index) => (
					<CollectionItem
						item={item}
						itemIndex={index}
						expandedItems={expandedItems}
						isUserLikedItem={isUserLikedItem}
						handleToggleLike={handleToggleLike}
						handleExpandClick={handleExpandClick}
					/>
				))}
			</Card>
		</div>
	);
};

export default CollectionItemsCard;
