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
import DeleteDialog from "../delete/DeleteDialog";

interface CollectionCardProps {
	data: IRowCollection;
	handleDelete: (id: number) => void;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ data, handleDelete }) => {
	const navigate = useNavigate();
	const theme = useTheme();
	const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState<boolean>(false);

	return (
		<>
			<DeleteDialog
				open={isDeleteDialogOpen}
				onClose={() => setDeleteDialogOpen(false)}
				onDelete={() => {
					handleDelete(Number(data.id));
					setDeleteDialogOpen(false);
				}}
			/>
			<Card
				sx={{
					boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
					marginTop: "15px",
					maxWidth: `${window.innerWidth - 20}px`,
					minWidth: "330px"
				}}
			>
				<CollectionCardHeader
					owner={data.owner}
					created_at={data.created_at}
					collectionId={data.id}
					handleCloseDeleteDialog={() => {
						setDeleteDialogOpen(false);
					}}
					handleOpenDeleteDialog={() => {
						setDeleteDialogOpen(true);
					}}
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
						<br />
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
		</>
	);
};

export default CollectionCard;