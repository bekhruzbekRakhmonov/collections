import { List, Box, Typography, ListItem, ListItemText, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usersApi } from "../../../utils/api/users";

const SearchResult: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [selectedButton, setSelectedButton] = useState<number | null>(null);
	const [searchResults, setSearchResults] = useState<any>();
	const theme = useTheme();
	const navigate = useNavigate();

	const { search } = useLocation();
	console.log(search);

	const handleButtonClick = (index: number) => {
		setSelectedButton((prev) => (prev === index ? null : index));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			// Navigate to the search results page with the current search query
			navigate(`/search/?q=${searchQuery}`);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				console.log("working")
				const {
					itemResults,
					userResults,
					collectionResults,
					commentResults,
				} = await usersApi.search(searchQuery);
				console.log(itemResults, userResults)
				// Set the search results in the state
				setSearchResults({
					items: itemResults,
					users: userResults,
					collections: collectionResults,
					comments: commentResults,
				});
			} catch (error: any) {
				console.error(error.message);
			}
		};

		// Only fetch data when the search query changes
		if (searchQuery) {
			fetchData();
		}
	}, [searchQuery]);

	return (
		<>
			{/* Your existing code for the search input and category buttons */}

			{/* Display search results */}
			<List
				sx={{
					border: `.5px solid ${theme.palette.divider}`,
					margin: "15px 5px 5px 5px",
					borderRadius: "10px",
					backgroundColor: theme.palette.background.paper,
				}}
			>
				{searchResults &&
					Object.entries(searchResults).map(([category, results]) => (
						<div key={category}>
							<Box
								sx={{
									borderBottom: `1px solid ${theme.palette.divider}`,
								}}
							>
								<Typography
									variant="h6"
									component="div"
									sx={{ padding: "10px" }}
								>
									{category}
								</Typography>
							</Box>
							<List>
								{(results as []).map((result: any) => (
									<>{result}</>
									// <ListItem key={result.id}>
									// 	<ListItemText primary={result.name} />
									// 	{/* Add more fields as needed */}
									// </ListItem>
								))}
							</List>
						</div>
					))}
			</List>
		</>
	);
};

export default SearchResult;
