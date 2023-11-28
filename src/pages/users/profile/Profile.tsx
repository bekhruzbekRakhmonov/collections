import React, { useEffect, useState } from "react";
import { Container, Tabs, Tab, Fab } from "@mui/material";
import ProfileCard from "../../../components/users/profile/ProfileCard";
import UserCollectionsList from "../../../components/users/profile/CollectionsList";
import { useNavigate, useParams } from "react-router-dom";
import { IRowUser, IUserStatistics } from "../../../utils/interfaces/user";
import { usersApi } from "../../../utils/api/users";
import { Add } from "@mui/icons-material";
import { useAuth } from "../../../auth/AuthContext";

const ProfilePage: React.FC = () => {
	const [activeTab, setActiveTab] = useState<number>(0);
	const [userData, setUserData] = useState<IRowUser | null>(null);
	const [userStatistics, setUserStatistics] =
		useState<IUserStatistics | null>(null);

	const { id } = useParams();
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();

	useEffect(() => {
		(async () => {
			try {
				const data = await usersApi.getUser(Number(id));
				setUserData(data);
				const statistics = await usersApi.getStatisticsByUserId(
					Number(id)
				);
				setUserStatistics(statistics);
			} catch (error: any) {
				console.error(error.message);
			}
		})();
	}, [id]);

	const handleTabChange = (
		event: React.ChangeEvent<{}>,
		newValue: number
	) => {
		setActiveTab(newValue);
	};

	return (
		<Container maxWidth="sm">
			<br />
			{userData && userStatistics && (
				<ProfileCard
					userData={userData}
					userStatistics={userStatistics}
				/>
			)}
			<Tabs value={activeTab} onChange={handleTabChange} centered>
				<Tab label="Collections" />
			</Tabs>
			{activeTab === 0 && (
				<>
					<UserCollectionsList userId={Number(id)} />
				</>
			)}
			{isAuthenticated && (
				<Fab
					color="primary"
					aria-label="add"
					onClick={() => navigate("/create-collection")}
					style={{
						position: "fixed",
						bottom: 16,
						right: 16,
					}}
				>
					<Add />
				</Fab>
			)}
		</Container>
	);
};

export default ProfilePage;
