import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import {
	Box,
	FormControl,
	FormLabel,
	TextField,
	Autocomplete,
	createFilterOptions,
} from "@mui/material";
import { usersApi } from "../../../../../utils/api/users";

interface TagsProps {
	tags: string[];
	onTagsChange: (tags: string[], itemIndex: number) => void;
	itemIndex: number;
}

const filter = createFilterOptions<string>();

const Tags: React.FC<TagsProps> = ({ onTagsChange, itemIndex, tags }) => {
	const [value, setValue] = useState<string>("");
	const [similarTags, setSimilarTags] = useState<string[]>([]);

	const addTag = () => {
		if (value.trim() !== "") {
			const newTags = [...tags, value.trim()];
			onTagsChange(newTags, itemIndex);
			setValue("");
		}
	};

	const handleDelete = (tagIndex: number) => {
		const newTags = tags.filter((_, index) => index !== tagIndex);
		onTagsChange(newTags, itemIndex);
	};

	const getSimilarTags = async (tag: string) => {
		try {
			const data = await usersApi.searchTags(tag);
			setSimilarTags(data);
		} catch (error) {
			console.error("Error fetching similar tags:", error);
		}
	};

	useEffect(() => {
		if (value && value.length > 0) {
			getSimilarTags(value);
		} else {
			setSimilarTags([]);
		}
	}, [value]);

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		setValue(inputValue);
	};

	return (
		<Stack
			direction="column"
			spacing={1}
			marginTop="10px"
			marginBottom="10px"
		>
			<FormControl fullWidth>
				<FormLabel>Tags</FormLabel>
				<Autocomplete
					fullWidth
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue as string);
					}}
					filterOptions={(options, params) => {
						const filtered = filter(options, params);

						const { inputValue } = params;

						if (inputValue && inputValue.length > 0) {
							const isExisting = similarTags.some(
								(option) => inputValue === option
							);
							if (!isExisting) {
								filtered.push(inputValue);
							}
						}

						return filtered;
					}}
					selectOnFocus
					clearOnBlur
					handleHomeEndKeys
					id="free-solo-with-text-demo"
					options={similarTags}
					getOptionLabel={(option) => option}
					renderOption={(props, option) => (
						<li {...props}>{option}</li>
					)}
					sx={{ width: 300 }}
					freeSolo
					renderInput={(params) => (
						<TextField
						fullWidth
							{...(params as any)}
							value={value}
							onKeyDown={(
								e: React.KeyboardEvent<HTMLDivElement>
							) => {
								if (e.key === "Enter") {
									addTag();
								}
							}}
							onChange={handleChange}
						/>
					)}
				/>
			</FormControl>
			<Box display="flex" flexWrap="wrap" marginTop="5px">
				{tags.map((tag, index) => (
					<Chip
						key={index}
						label={tag}
						variant="outlined"
						onDelete={() => handleDelete(index)}
						style={{ margin: "2px" }}
					/>
				))}
			</Box>
		</Stack>
	);
};

export default Tags;
