import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Box, TextField } from "@mui/material";


interface TagsProps {
    formDataTags: string[];
}

const Tags: React.FC<TagsProps> = ({ formDataTags }) => {
	const [tags, setTags] = React.useState<string[]>([]);
	const [value, setValue] = React.useState<string>("");

    React.useEffect(() => {
        formDataTags.concat(tags);
    }, [tags])

	const addTag = () => {
		if (value) setTags((prevTags) => [...prevTags, value]);
	};

	const handleDelete = (tagIndex: number) => {
		setTags(() => tags.filter((_, index) => index !== tagIndex));
	};

	return (
		<Stack
			direction="column"
			spacing={1}
			marginTop="10px"
			marginBottom="10px"
		>
			<TextField
				fullWidth
				required
				label="Tags"
				value={value}
				onKeyDown={(e) => {
					if (e.key === "Shift") {
						setValue("");
						addTag();
					}
				}}
				onChange={(e) => setValue(e.target.value)}
			/>
			<Box display="flex">
				{formDataTags.map((tag, index) => (
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