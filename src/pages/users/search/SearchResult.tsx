import React, { useEffect, useState } from "react";
import {
	Box,
	Button,
	List,
	ListItem,
	ListItemText,
	Typography,
	useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { usersApi } from "../../../utils/api/users";
import SearchInput from "../../../components/users/appbar/SearchInput";

const categories = ["Collections", "Items", "People", "Comments"];

const SearchResult: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [selectedButton, setSelectedButton] = useState<number>(0);
	const [searchResults, setSearchResults] = useState<any>();
	const theme = useTheme();
	const navigate = useNavigate();

	const { search } = useLocation();
	console.log(search);

	const handleButtonClick = (index: number) => {
		setSelectedButton((prev) => (prev === index ? 0 : index));
	};


	useEffect(() => {
		const fetchData = async () => {
			try {
				const {
					itemResults,
					userResults,
					collectionResults,
					commentResults,
				} = await usersApi.search(search.split("=")[1]);
				setSearchResults({
					items: itemResults,
					people: userResults,
					collections: collectionResults,
					comments: commentResults,
				});
			} catch (error: any) {
				console.error(error.message);
			}
		};

		fetchData();
	}, [search]);

	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					margin: "15px 5px 5px 5px",
					borderRadius: "10px",
					backgroundColor: theme.palette.background.paper,
				}}
			>
				<Box
					sx={{
						flexGrow: 1,
						display: "flex",
						flexDirection: "column",
						margin: "6px",
						maxWidth: { xs: 350, sm: 480 },
						bgcolor: theme.palette.background.paper,
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							marginTop: "8px",
							overflowX: "auto",
							minWidth: "350px",
							"& > *": {
								flex: "0 0 auto",
							},
						}}
					>
						{categories.map((category, index) => (
							<Button
								key={index}
								style={{
									borderRadius: "50px",
									padding: "10px 20px",
									fontWeight: "600",
									height: "35px",
									textTransform: "none",
									marginRight: "5px",
									border: `1px solid ${theme.palette.text.primary}`,
									color:
										selectedButton === index
											? theme.palette.common.white
											: theme.palette.text.primary,
									backgroundColor:
										selectedButton === index
											? theme.palette.primary.main
											: theme.palette.background.default,
								}}
								onClick={() => handleButtonClick(index)}
							>
								{category}
							</Button>
						))}
					</Box>
					<List
						sx={{
							margin: "15px 5px 5px 5px",
							borderRadius: "10px",
							backgroundColor: theme.palette.background.paper,
						}}
					>
						{searchResults &&
							searchResults[
								categories[selectedButton].toLowerCase()
							].map((data: any, index: number) => {
								const uniqueId = data.id;

								return (
									<ListItem key={uniqueId}>
										<ListItemText primary={data.name} />
									</ListItem>
								);
							})}
					</List>
				</Box>
			</div>
		</>
	);
};

export default SearchResult;
