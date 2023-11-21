import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Box, FormLabel, TextField } from "@mui/material";

interface TagsProps {
	tags: string[];
	onTagsChange: (tags: string[], itemIndex: number) => void;
	itemIndex: number;
}

const Tags: React.FC<TagsProps> = ({ onTagsChange, itemIndex, tags }) => {
	const [value, setValue] = React.useState<string>("");

	const addTag = () => {
		if (value !== "") {
			const newTags = [...tags, value.trim()];
			console.log(newTags)
			onTagsChange(newTags, itemIndex);
		}
	};

	const handleDelete = (tagIndex: number) => {
		const newTags = tags.filter((_, index) => index !== tagIndex);
		onTagsChange(newTags, itemIndex);
	};

	return (
		<Stack
			direction="column"
			spacing={1}
			marginTop="10px"
			marginBottom="10px"
		>
			<TextField
				multiline
				fullWidth
				label="Tags"
				rows={1}
				value={value}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						setValue("");
						addTag();
					}
				}}
				onChange={(e) => setValue(e.target.value)}
			/>
			<Box display="block">
				{typeof tags !== "string"
					? tags.map((tag, index) => (
							<Chip
								key={index}
								label={tag}
								variant="outlined"
								onDelete={() => handleDelete(index)}
							/>
					  ))
					: (tags as string).split(",").map((tag, index) => (
							<Chip
								key={index}
								label={tag}
								variant="outlined"
								onDelete={() => handleDelete(index)}
							/>
					  ))}
			</Box>
		</Stack>
	);
};

export default Tags;
