import React, { useState } from "react";
import { Container, Tabs, Tab } from "@mui/material";
import ProfileCard from "../../../components/users/profile/ProfileCard";
import CollectionsList from "../../../components/users/collections/show/CollectionsList";
import { useAuth } from "../../../auth/AuthContext";
import UserCollectionsList from "../../../components/users/profile/CollectionsList";
import { useParams } from "react-router-dom";

const ProfilePage: React.FC = () => {
	const [activeTab, setActiveTab] = useState<number>(0);
	const { user } = useAuth();
	const {id: userId} = useParams();

	const handleTabChange = (
		event: React.ChangeEvent<{}>,
		newValue: number
	) => {
		setActiveTab(newValue);
	};

	const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

	const handleDelete = () => {
		// Implement your delete logic here
		console.log("Item deleted!");
		setDeleteDialogOpen(false);
	};

	const handleOpenDeleteDialog = () => {
		setDeleteDialogOpen(true);
	};

	const handleCloseDeleteDialog = () => {
		setDeleteDialogOpen(false);
	};

	return (
		<Container maxWidth="sm">
			<br/>
			<ProfileCard user={user} />
			<Tabs value={activeTab} onChange={handleTabChange} centered>
				<Tab label="Collections" />
			</Tabs>
			{activeTab === 0 && <UserCollectionsList userId={Number(userId)} handleCloseDeleteDialog={handleCloseDeleteDialog} handleOpenDeleteDialog={handleOpenDeleteDialog} handleDelete={handleDelete}/>}
		</Container>
	);
};

export default ProfilePage;
