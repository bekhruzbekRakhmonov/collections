import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

interface CommentProps {
	author: string;
	content: string;
	timestamp?: string;
	avatar?: string;
}

const Comment: React.FC<CommentProps> = ({
	author,
	content,
	timestamp,
	avatar,
}) => {
	const theme = useTheme();
	return (
		<div
			style={{
				display: "flex",
				marginBottom: "16px",
			}}
		>
			<Avatar>B</Avatar>
			<div style={{ background: theme.palette.mode === 'light' ? "#f0f0f0" : theme.palette.background.default, borderRadius: "10px", padding: "3px" }}>
				<Typography variant="subtitle1" fontWeight="bold">
					{author}
				</Typography>
				<Typography variant="body2" color="textSecondary">
					{timestamp}
				</Typography>
				<Typography variant="body1">{content}</Typography>
			</div>
		</div>
	);
};

export default Comment;
