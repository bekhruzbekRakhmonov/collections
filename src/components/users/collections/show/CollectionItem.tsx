import { Card, CardActions, Box, CardContent, Chip, IconButton, Typography } from "@mui/material";
import CommentsList from "../../comments/CommentsList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ExpandMore from "../../utils/ExpandMore";
import { Favorite } from "@mui/icons-material";
import { IRowItem } from "../../../../utils/interfaces/item";
import { useAuth } from "../../../../auth/AuthContext";
import RenderTags from "./utils/RenderTags";
import Cookies from "js-cookie";
import { io } from "socket.io-client";

interface CollectionItemProps {
	item: IRowItem;
    itemIndex: number;
	isUserLikedItem: (index: number) => boolean;
	handleToggleLike: (id: number) => void;
	handleExpandClick: (itemId: number) => void;
	expandedItems: number[];
}

const CollectionItem: React.FC<CollectionItemProps> = ({
	item,
    itemIndex,
	isUserLikedItem,
	handleToggleLike,
	handleExpandClick,
    expandedItems,
}) => {
    const {isAuthenticated} = useAuth();

	const token = Cookies.get("accessToken");
	const socket = io(`${process.env.REACT_APP_BACKEND_URL}`, {
		transports: ["websocket"],
		auth: {
			token,
		},
		reconnection: true,
	});
	return (
		<Card
			key={item.id}
			sx={{
				borderRadius: 0,
				borderTop: ".5px solid black",
			}}
		>
			<CardContent>
				<Typography variant="h6">{item.name}</Typography>
				{item.custom_fields?.map((field, index) => (
					<Box
						key={index}
						sx={{
							display: "flex",
							alignItems: "center",
						}}
					>
						<Typography variant="body1" sx={{ marginRight: "5px" }}>
							{field.name}:
						</Typography>
						<Typography variant="body2" sx={{ fontWeight: 700 }}>
							{field.value}
						</Typography>
					</Box>
				))}
				{item.tags && item.tags.length > 0 ? (
					<RenderTags tags={item.tags.split(",")} />
				) : (
					<RenderTags tags={[]} />
				)}
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
								window.alert("Please login to like item");
							} else {
								handleToggleLike(item.id);
							}
						}}
					>
						{isAuthenticated && isUserLikedItem(itemIndex) ? (
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
						aria-expanded={expandedItems.includes(item.id)}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</ExpandMore>
				</Box>
			</CardActions>
			<CommentsList
				socket={socket}
				expanded={expandedItems.includes(item.id)}
				itemId={item.id}
			/>
		</Card>
	);
};

export default CollectionItem;