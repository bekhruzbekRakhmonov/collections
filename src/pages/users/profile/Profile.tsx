import React, { useState } from "react";
import { Container, Tabs, Tab } from "@mui/material";
import Collection from "../../../components/users/collections/CollectionsList";
import ProfileCard from "../../../components/users/profile/ProfileCard";

const ProfilePage: React.FC = () => {
	const [activeTab, setActiveTab] = useState<number>(0);

	const handleTabChange = (
		event: React.ChangeEvent<{}>,
		newValue: number
	) => {
		setActiveTab(newValue);
	};

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
			<br/>
			<ProfileCard {...userData} />
			<Tabs value={activeTab} onChange={handleTabChange} centered>
				<Tab label="Posts" />
				<Tab label="Photos" />
				{/* Add more tabs as needed */}
			</Tabs>
			{activeTab === 0 && <Collection />}
			{activeTab === 1 && <h2>Photos content goes here</h2>}
			{/* Add more tab content components for other tabs */}
		</Container>
	);
};

export default ProfilePage;
