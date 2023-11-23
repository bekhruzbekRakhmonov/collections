import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { Alert, CardContent, CircularProgress, Collapse } from "@mui/material";
import { useAuth } from "../../../auth/AuthContext";
import CommentForm from "./CommentForm";
import { io } from "socket.io-client";
import { usersApi } from "../../../utils/api/users";
import { IRowComment } from "../../../utils/interfaces/comment";
import Loading from "../../loading/Loading";
import LoginDialog from "../../auth/login/LoginDialog";

interface CommentsProp {
	expanded: boolean;
	itemId: number;
}

const CommentsList: React.FC<CommentsProp> = ({ expanded, itemId }) => {
	const { user, isAuthenticated } = useAuth();
	const [newComment, setNewComment] = useState("");
	const [comments, setComments] = useState <Partial<IRowComment>[]>([]);
	const [error, setError] = useState<string | null>("null");
	const [loading, setLoading] = useState<boolean>(false);
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const socket = io("http://localhost:4000", {
		transports: ["websocket"],
	});

	useEffect(() => {
		setLoading(true);
		(async () => {
			try {
				const comments = await usersApi.getComments(itemId, 8);
				setComments(comments);
			} catch (error: any) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		})();
	}, [itemId]);


	useEffect(() => {
		socket.on("connect", () => {
			console.log("Connected to server");
			// Join the room associated with the item
			socket.emit("joinRoom", itemId);
		});

		socket.on("newComment", (data) => {
			const { item, ...rest } = data;
			setComments((prevComments) => [rest, ...prevComments]);
		});

		return () => {
			socket.emit("leaveRoom", itemId);
			socket.disconnect();
		};
	}, [itemId, socket]);

	const handleCommentChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setNewComment(event.target.value);
	};

	const handleAddComment = () => {
		if (!isAuthenticated) {
			setOpen(true);
			return;
		}

		socket.emit("createComment", {
			content: newComment,
			item_id: itemId,
		});

		setNewComment("");
	};

	return (
		<>
			{open && <LoginDialog open={open} handleClose={handleClose}/>}
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<CommentForm
						newComment={newComment}
						handleAddComment={handleAddComment}
						handleCommentChange={handleCommentChange}
						isAuthenticated={isAuthenticated}
					/>
					<br />
					{loading ? (
						<Loading />
					) : (
						comments.map((comment) => (
							<Comment
								key={comment.id}
								author={comment?.owner?.name || ""}
								content={comment?.content || ""}
							/>
						))
					)}
				</CardContent>
			</Collapse>
		</>
	);
};

export default CommentsList;
