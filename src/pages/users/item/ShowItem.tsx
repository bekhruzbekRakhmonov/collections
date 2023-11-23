import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Avatar, Chip, Box, CardHeader, IconButton, Container } from "@mui/material";// Adjust the import path based on your actual item model
import { IRowItem } from "../../../utils/interfaces/item";
import { useParams } from "react-router-dom";
import { usersApi } from "../../../utils/api/users";
import { red } from "@mui/material/colors";
import { MoreVert } from "@mui/icons-material";
import ItemCardHeader from "./ItemCardHeader";

interface ItemCardProps {

}

const ShowItem: React.FC<ItemCardProps> = () => {
    const {id} = useParams();

    const [item, setItem] = useState<IRowItem | null>(null)

    useEffect(() => {
        (async () => {
            const data = await usersApi.getItem(String(id));
            setItem(data);
        })()
    }, [id])
	return (
		<Container sx={{ display: "flex" }}>
			{item !== null && (
				<Card>
					{/* You can customize the card header based on your item data */}
					<ItemCardHeader owner={item.owner} itemId={item.id} created_at={item.created_at} handleCloseDeleteDialog={() => {}} handleOpenDeleteDialog={() => {}}/>

					{/* Custom Fields */}
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
						{(item.tags && item.tags.length > 0
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

					{/* Likes */}
					<CardContent>
						<Typography variant="h6">Likes:</Typography>
						{item.likes?.map((like: any, index: any) => (
							<Chip
								key={index}
								avatar={<Avatar>{like.owner.name[0]}</Avatar>}
								label={like.owner.name}
								style={{ margin: "4px" }}
							/>
						))}
					</CardContent>
				</Card>
			)}
		</Container>
	);
};

export default ShowItem;
