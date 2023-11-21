import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, useTheme } from "@mui/material";
import {  IRowCollection } from "../../../../utils/interfaces/collection";
import MDEditor from "@uiw/react-md-editor";
import { useNavigate } from "react-router-dom";
import api from "../../../../utils/api/api";
import CollectionCardHeader from "./CollectionCardHeader";

const CollectionCard = ({ data }: { data: IRowCollection }) => {
	const navigate = useNavigate();
	const theme = useTheme();

	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	

	return (
		<Card
			sx={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)", marginTop: "15px" }}
		>
			<CollectionCardHeader
				owner={data.owner}
				created_at={data.created_at}
				collectionId={data.id}
			/>
			<CardActionArea
				onClick={() => navigate(`/show-collection/${data.id}`)}
			>
				{data.photo && (
					<CardMedia
						sx={{ objectFit: "contain" }}
						component="img"
						height="140"
						src={api.getUri() + data.photo}
						alt="Collection Photo"
					/>
				)}
				<CardContent>
					<Typography
						gutterBottom
						variant="h5"
						component="div"
						sx={{ fontWeight: "bold" }}
					>
						{data.name}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Topic:{" "}
					</Typography>
					<Typography variant="body1" color="text.primary">
						{data.topic}
					</Typography>
					<br/>
					<Typography variant="body2" color="text.secondary">
						Description:{" "}
					</Typography>
					<div
						data-color-mode={theme.palette.mode}
						style={{ marginTop: "8px" }}
					>
						<MDEditor.Markdown
							source={data.description}
							style={{ whiteSpace: "pre-wrap" }}
						/>
					</div>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default CollectionCard;