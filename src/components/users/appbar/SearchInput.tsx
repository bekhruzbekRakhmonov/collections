import React, { CSSProperties } from "react";
import {
	FormControl,
	Input,
	InputAdornment,
	IconButton,
	colors,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchInputProps {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    searchQuery: string;
	style?: CSSProperties;
}

const SearchInput: React.FC<SearchInputProps> = ({ onChange, searchQuery, style }) => {
	return (
		<div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					textAlign: "center",
					borderRadius: "25px",
					minWidth: "200px",
					maxWidth: "600px",
                    border: '.5px solid black',
					...style
				}}
			>
				<p style={{ margin: "0 5px" }}></p>
				<FormControl
					fullWidth
					variant="standard"
					size="medium"
					sx={{ m: 1 }}
				>
					<Input
						fullWidth
						disableUnderline
						placeholder="Search"
						sx={{ height: "25px", marginTop: "3px" }}
                        value={searchQuery}
						onChange={onChange}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									edge="start"
									sx={{ color: colors.grey[400] }}
									aria-label="search"
								>
									<SearchIcon />
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
			</div>
		</div>
	);
};

export default SearchInput;
