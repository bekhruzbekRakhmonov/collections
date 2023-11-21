import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, Box, CardActions, Chip, IconButton, useTheme } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { IRowCollection } from "../../../../utils/interfaces/collection";
import { IRowItem } from "../../../../utils/interfaces/item";
import { ICustomField } from "../../../../utils/interfaces/custom-fields";
import { Favorite } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { usersApi } from "../../../../utils/api/users";
import { useAuth } from "../../../../auth/AuthContext";
import api from "../../../../utils/api/api";
import CollectionCardHeader from "./CollectionCardHeader";
import ExpandMore from "../../utils/ExpandMore";
import CommentsList from "../../comments/CommentsList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CollectionItemsCard = ({
	data,
	onEditCollection,
	onEditItem,
	onDeleteCollection,
	onDeleteItem,
}: {
	data: IRowCollection;
	onEditCollection: (collection: IRowCollection) => void;
	onEditItem: (item: IRowItem) => void;
	onDeleteCollection: (collectionId: number) => void;
	onDeleteItem: (itemId: number) => void;
}) => {
	const [isItemsCollapsed, setItemsCollapsed] = useState(true);
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	const [editedCollection, setEditedCollection] = useState({
		...data,
	});
	const [editedItem, setEditedItem] = useState<IRowItem | null>(null);
	const { user, isAuthenticated } = useAuth();
	const theme = useTheme();

	const [expandedItems, setExpandedItems] = useState<number[]>([]);

	const handleExpandClick = (itemId: number) => {
		setExpandedItems((prevExpandedItems) => {
			if (prevExpandedItems.includes(itemId)) {
				// If the item is already expanded, collapse it
				return prevExpandedItems.filter((id) => id !== itemId);
			} else {
				// If the item is not expanded, expand it
				return [...prevExpandedItems, itemId];
			}
		});
	};


	const handleLike = async (id: number) => {
		try {
			// Assuming this function returns the updated item data
			const updatedItem = await usersApi.likeItem(id);
			// Find the index of the updated item in the data.items array
			const itemIndex = data.items.findIndex(
				(item) => item.id === updatedItem.id
			);
			// Update the item in the state
			const updatedItems = [...data.items];
			updatedItems[itemIndex] = updatedItem;
			setEditedCollection((prevCollection) => ({
				...prevCollection,
				items: updatedItems,
			}));
		} catch (error) {
			console.error("Error liking item:", error);
		}
	};

	const handleUnlike = async (id: number) => {
		try {
			// Assuming this function returns the updated item data
			const updatedItem = await usersApi.unlikeItem(id);
			// Find the index of the updated item in the data.items array
			const itemIndex = data.items.findIndex(
				(item) => item.id === updatedItem.id
			);
			// Update the item in the state
			const updatedItems = [...data.items];
			updatedItems[itemIndex] = updatedItem;
			setEditedCollection((prevCollection) => ({
				...prevCollection,
				items: updatedItems,
			}));
		} catch (error) {
			console.error("Error unliking item:", error);
		}
	};

	const isUserLikedItem = (index: number) => {
		console.log(
			"liked",
			data.items[index].likes?.map((like) => like.owner.id === user.id)
		);
		return (
			data.items[index].likes.map((like) => like.owner.id === user.id)
				.length > 0
		);
	};

	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<Card
				sx={{ marginTop: "15px", maxWidth: "600px", minWidth: "300px" }}
			>
				<CollectionCardHeader
					owner={data.owner}
					created_at={data.created_at}
					collectionId={data.id}
				/>
				<CardMedia
					sx={{
						height: 140,
						margin: "5px",
						backgroundSize: "contain",
					}}
					image={api.getUri() + data.photo}
					title="green iguana"
				/>
				<Typography variant="h5" sx={{ margin: "5px" }}>
					{data.name}
				</Typography>
				<CardContent sx={{ paddingLeft: "5px", paddingTop: 0 }}>
					{data.description ? (
						<div data-color-mode={theme.palette.mode}>
							<MDEditor.Markdown
								source={data.description}
								style={{ whiteSpace: "pre-wrap" }}
							/>
						</div>
					) : (
						<Typography>No description available</Typography>
					)}
				</CardContent>
				{data.items.map((item, index) => (
					<Card
						key={item.id}
						sx={{
							borderRadius: 0,
							borderTop: ".5px solid black",
						}}
					>
						<CardContent>
							<Typography variant="h6">{item.name}</Typography>
							{item.custom_fields?.map((field) => (
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
									}}
								>
									<Typography
										variant="body1"
										sx={{ marginRight: "5px" }}
									>
										{field.name}:
									</Typography>
									<Typography
										variant="body2"
										sx={{ fontWeight: 700 }}
									>
										{field.value}
									</Typography>
								</Box>
							))}
							{(item.tags.length > 0
								? item.tags.split(",")
								: []
							).map((tag) => (
								<Chip
									label={`#${tag}`}
									clickable
									sx={{
										borderRadius: "5px",
										border: ".5px solid black",
										margin: "2px",
									}}
								/>
							))}
						</CardContent>
						<CardActions
							disableSpacing
							sx={{
								paddingTop: 0,
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<IconButton
									onClick={(e) => {
										if (!isAuthenticated) {
											window.alert(
												"Please login to like item"
											);
										}
									}}
								>
									{isAuthenticated &&
									isUserLikedItem(index) ? (
										<Favorite color="error" />
									) : (
										<FavoriteBorderIcon />
									)}
								</IconButton>
								<Typography>5</Typography>
							</Box>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									cursor: "pointer",
								}}
								onClick={() => handleExpandClick(item.id)}
							>
								Comments
								<ExpandMore
									expand={expandedItems.includes(item.id)}
									onClick={() => handleExpandClick(item.id)}
									aria-expanded={expandedItems.includes(
										item.id
									)}
									aria-label="show more"
								>
									<ExpandMoreIcon />
								</ExpandMore>
							</Box>
						</CardActions>
						<CommentsList
							expanded={expandedItems.includes(item.id)}
							itemId={item.id}
						/>
					</Card>
				))}
			</Card>
		</div>
	);
};

export default CollectionItemsCard;
