import React, { useEffect, useState } from "react";
import { Container, Tabs, Tab } from "@mui/material";
import ProfileCard from "../../../components/users/profile/ProfileCard";
import CollectionsList from "../../../components/users/collections/show/CollectionsList";
import { useAuth } from "../../../auth/AuthContext";
import UserCollectionsList from "../../../components/users/profile/CollectionsList";
import { useParams } from "react-router-dom";
import { IRowUser } from "../../../utils/interfaces/user";
import { usersApi } from "../../../utils/api/users";

const ProfilePage: React.FC = () => {
	const [activeTab, setActiveTab] = useState<number>(0);
	const [userData, setUserData] = useState<IRowUser | null>(null);
	const { id } = useParams();

	useEffect(() => {
		(async () => {
			try {
				const data = await usersApi.getUser(String(id));
				setUserData(data);
			} catch (error: any) {
				console.error(error.message)
			}
		})()
	}, [id])

	const handleTabChange = (
		event: React.ChangeEvent<{}>,
		newValue: number
	) => {
		setActiveTab(newValue);
	};


	return (
		<Container maxWidth="sm">
			<br/>
			{ userData && <ProfileCard user={userData} />}
			<Tabs value={activeTab} onChange={handleTabChange} centered>
				<Tab label="Collections" />
			</Tabs>
			{activeTab === 0 && <UserCollectionsList userId={Number(id)} />}
		</Container>
	);
};

export default ProfilePage;
