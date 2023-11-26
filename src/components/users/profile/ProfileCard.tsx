import React, { CSSProperties } from "react";
import { Avatar, Typography, Box, Link } from "@mui/material";
import { IRowUser, IUserStatistics } from "../../../utils/interfaces/user";

const profileStyles = {
	root: {
		display: "flex",
		alignItems: "center",
		gap: "16px",
		padding: "16px",
		border: "1px solid #e0e0e0",
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
};

interface ProfileProps {
	userData: IRowUser;
	userStatistics: IUserStatistics;
}

const ProfileCard: React.FC<ProfileProps> = ({ userData, userStatistics }) => {
	return (
		<Box style={profileStyles.root}>
			<Avatar style={profileStyles.avatar} />
			<div style={profileStyles.infoContainer as CSSProperties}>
				<Typography variant="h6">{userData.name}</Typography>
				<Typography variant="body2" color="textSecondary">
					{userData.email}
				</Typography>
				<Typography variant="body2">
					Collections: {userStatistics.collections_count}
				</Typography>
				<Typography variant="body2">
					Items: {userStatistics.items_count}
				</Typography>
				<Typography variant="body2">
					Likes: {userStatistics.likes_count}
				</Typography>
			</div>
		</Box>
	);
};

export default ProfileCard;
