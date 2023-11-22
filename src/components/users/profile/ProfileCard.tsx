import React, { CSSProperties } from "react";
import { Avatar, Typography, Box, Link } from "@mui/material";
import { IRowUser } from "../../../utils/interfaces/user";

const profileStyles = {
	root: {
		display: "flex",
		alignItems: "center",
		gap: "16px", // Adjust the gap as needed
		padding: "16px",
		border: "1px solid #ccc",
		borderRadius: "8px",
		boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
	},
	avatar: {
		width: "64px",
		height: "64px",
	},
	infoContainer: {
		display: "flex",
		flexDirection: "column",
	},
	bio: {
		marginTop: "8px",
	},
	link: {
		marginTop: "8px",
		textDecoration: "none",
		color: "#007bff",
	},
};

interface ProfileProps {
	user: IRowUser;
}

const ProfileCard: React.FC<ProfileProps> = ({
	user
}) => {
	return (
		<Box style={profileStyles.root}>
			<Avatar />
			<div style={profileStyles.infoContainer as CSSProperties}>
				<Typography variant="h6">{user.name}</Typography>
				<Typography variant="body2" color="textSecondary">
					{user.email}
				</Typography>
				{/* <Typography variant="body2" style={profileStyles.bio}>
					{user}
				</Typography>
				<Typography variant="body2">{location}</Typography>
				{website && (
					<Link
						href={website}
						target="_blank"
						rel="noopener noreferrer"
						variant="body2"
						style={profileStyles.link}
					>
						{website}
					</Link>
				)} */}
			</div>
		</Box>
	);
};

export default ProfileCard;
