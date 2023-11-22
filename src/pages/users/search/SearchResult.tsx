import React, { useState } from "react";
import SearchInput from "../../../components/users/appbar/SearchInput";
import { Box, Button, List, colors, useTheme } from "@mui/material";

const categories = ["Collections", "Items", "Comments"];

const SearchResult: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [selectedButton, setSelectedButton] = useState<number | null>(null);

    const theme = useTheme();

	const handleButtonClick = (index: number) => {
		setSelectedButton((prev) => (prev === index ? null : index));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	return (
        <>
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				border: ".5px solid grey",
				margin: "15px 5px 5px 5px",
				borderRadius: "10px",
			}}
		>
			<Box
				sx={{
					flexGrow: 1,
					display: "flex",
					flexDirection: "column",
					margin: "6px",
					maxWidth: { xs: 350, sm: 480 },
					bgcolor: "background.paper",
				}}
			>
				<SearchInput
					onChange={handleChange}
					searchQuery={searchQuery}
					style={{ minWidth: "350px" }}
				/>
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
								border: ".5px solid black",
								color:
									selectedButton === index
										? colors.common.white
										: colors.common.black,
								backgroundColor:
									selectedButton === index
										? colors.common.black
										: "transparent",
							}}
							onClick={() => handleButtonClick(index)}
						>
							{category}
						</Button>
					))}
				</Box>
			</Box>
		</div>
        <List
				sx={{
					border: ".5px solid grey",
					margin: "15px 5px 5px 5px",
					borderRadius: "10px",
				}}
			></List>
        </>
	);
};

export default SearchResult;
