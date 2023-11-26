import { Chip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface RenderTagsProps {
	tags: string[];
}

const RenderTags: React.FC<RenderTagsProps> = ({ tags }) => {
    const navigate = useNavigate();
	return (
		<>
			{tags.map((tag) => (
				<Chip
					key={tag}
					label={`#${tag}`}
					clickable
                    onClick={() => navigate(`/search/?q=${tag}`)}
					sx={{
						borderRadius: "5px",
						border: ".5px solid black",
						margin: "2px",
					}}
				/>
			))}
		</>
	);
};

export default RenderTags;
