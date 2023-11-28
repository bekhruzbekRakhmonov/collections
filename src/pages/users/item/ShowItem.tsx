import React, { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	Typography,
	Box,
	IconButton,
	CardActions,
} from "@mui/material";
import { IRowItem } from "../../../utils/interfaces/item";
import { useParams } from "react-router-dom";
import { usersApi } from "../../../utils/api/users";
import { Favorite } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ItemCardHeader from "../../../components/users/items/ItemCardHeader";
import { useAuth } from "../../../auth/AuthContext";
import ExpandMore from "../../../components/users/utils/ExpandMore";
import CommentsList from "../../../components/users/comments/CommentsList";
import RenderTags from "../../../components/users/collections/show/utils/RenderTags";
import { io } from "socket.io-client";

interface ItemCardProps {}

const ShowItem: React.FC<ItemCardProps> = () => {
	const { id } = useParams();

	const [item, setItem] = useState<IRowItem | null>(null);
	const { user, isAuthenticated } = useAuth();

	const [expanded, setExpanded] = useState<boolean>(false);

	const handleExpandClick = () => {
		setExpanded(!expanded)
	};

	const socket = io(`${process.env.REACT_APP_BACKEND_URL}`, {
		transports: ["websocket"],
		reconnection: true,
	});

	useEffect(() => {
		const fetchItem = async () => {
			try {
				const data = await usersApi.getItem(String(id));
				setItem(data);
			} catch (error) {
				console.error("Error fetching item:", error);
			}
		};

		fetchItem();
	}, [id]);

	const handleLike = async () => {
		try {
			const updatedItem = await usersApi.likeOrUnlikeItem(item?.id || 0);
			setItem(updatedItem);
		} catch (error) {
			console.error("Error toggling like:", error);
		}
	};

	const isUserLikedItem = () => {
		if (!item) return false;
		return item.likes?.some((like) => like.owner.id === Number(user.id));
	};


	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				marginTop: "20px",
			}}
		>
			{item !== null && (
				<Card sx={{ minWidth: "320px" }}>
					<ItemCardHeader
						owner={item.owner}
						itemId={item.id}
						created_at={item.created_at}
						handleCloseDeleteDialog={() => {}}
						handleOpenDeleteDialog={() => {}}
					/>

					<CardContent>
						<Typography variant="h5">{item.name}</Typography>
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
						{item.tags && item.tags.length > 0 ? (
							<RenderTags tags={item.tags.split(",")} />
						) : <RenderTags tags={[]} />}
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
										handleLike();
									}
								}}
							>
								{isAuthenticated && isUserLikedItem() ? (
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
							onClick={handleExpandClick}
						>
							Comments
							<ExpandMore
								expand={expanded}
								onClick={handleExpandClick}
								aria-expanded={expanded}
								aria-label="show more"
							>
								<ExpandMoreIcon />
							</ExpandMore>
						</Box>
					</CardActions>
					<CommentsList socket={socket} expanded={expanded} itemId={item.id} />
				</Card>
			)}
		</div>
	);
};

export default ShowItem;
