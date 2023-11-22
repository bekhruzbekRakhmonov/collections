import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActions, Chip, IconButton, useTheme } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { IRowCollection } from "../../../../utils/interfaces/collection";
import { Favorite } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { usersApi } from "../../../../utils/api/users";
import { useAuth } from "../../../../auth/AuthContext";
import api from "../../../../utils/api/api";
import CollectionCardHeader from "./CollectionCardHeader";
import ExpandMore from "../../utils/ExpandMore";
import CommentsList from "../../comments/CommentsList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface CollectionItemsCardProps {
	data: IRowCollection;
	updateData: (data: React.SetStateAction<IRowCollection | null>) => void;
	handleOpenDeleteDialog: () => void;
	handleCloseDeleteDialog: () => void;
	handleDelete: () => void;
}
const CollectionItemsCard: React.FC<CollectionItemsCardProps> = ({
	data,
	updateData,
	handleCloseDeleteDialog,
	handleOpenDeleteDialog,
	handleDelete,
}) => {
	const { user, isAuthenticated } = useAuth();
	const theme = useTheme();

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
		return (
			data.items[index].likes!.map((like) => like.owner.id === user.id)
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
					handleCloseDeleteDialog={handleCloseDeleteDialog}
					handleOpenDeleteDialog={handleOpenDeleteDialog}
					handleDelete={handleDelete}
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
										} else {
											handleToggleLike(item.id);
										}
									}}
								>
									{isAuthenticated && isUserLikedItem(index) ? (
										<Favorite color="error" />
									) : (
										<FavoriteBorderIcon />
									)}
								</IconButton>
								<Typography>{item.likes?.length}</Typography>
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
