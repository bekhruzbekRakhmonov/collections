
import React from "react";
import { Container } from "@mui/material";
import Profile from "../profile/Profile";

const ProfilePage: React.FC = () => {
	const userData = {
		name: "John Doe",
		email: "john@example.com",
		avatarUrl: "https://example.com/avatar.jpg",
		bio: "Passionate developer exploring new technologies.",
		location: "New York, USA",
		website: "https://johndoe.com",
	};
	return (
		<Container maxWidth="sm">
			<h1>Welcome to Your Profile Page</h1>
			<Profile {...userData} />
		</Container>
	);
};

export default ProfilePage;
