import { Send } from "@mui/icons-material";
import { Box, FormControl, Input, InputAdornment, IconButton, useTheme } from "@mui/material";
import React, { useState } from "react";
import LoginDialog from "../../common/auth/login/LoginDialog";

interface Comment {
	id: number;
	author: string;
	content: string;
}

interface CommentFormProps {
	isAuthenticated: boolean;
	newComment: string;
	handleCommentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleAddComment: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ newComment, handleCommentChange, handleAddComment, isAuthenticated }) => {
    const theme = useTheme();
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<Box
			sx={{
				marginTop: "15px",
				display: "flex",
				alignItems: "center",
				textAlign: "center",
				background: theme.palette.mode === 'light' ? "#f0f0f0" : theme.palette.background.default,
				borderRadius: "25px",
				maxWidth: "350px",
			}}
		>
			{ open && <LoginDialog open={open} handleClose={handleClose}/> }
			<FormControl
				fullWidth
				variant="standard"
				size="medium"
				sx={{ m: 1 }}
			>
				<Input
					fullWidth
					onSubmit={handleAddComment}
					disableUnderline
					placeholder="Add comment..."
					sx={{ height: "25px" }}
					value={newComment}
					onChange={handleCommentChange}
					onKeyUp={(e) => {
						if (e.key === "Enter") {
							handleAddComment();
						}
					}}
					onClick={(e) => !isAuthenticated ? setOpen(true) : ''}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								color="info"
								aria-label="comment"
								onClick={handleAddComment}
							>
								<Send />
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>
		</Box>
	);
}

export default CommentForm;