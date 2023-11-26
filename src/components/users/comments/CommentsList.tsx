import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { Alert, CardContent, CircularProgress, Collapse } from "@mui/material";
import { useAuth } from "../../../auth/AuthContext";
import CommentForm from "./CommentForm";
import { Socket, io } from "socket.io-client";
import { usersApi } from "../../../utils/api/users";
import { IRowComment } from "../../../utils/interfaces/comment";
import Loading from "../../common/loading/Loading";
import LoginDialog from "../../common/auth/login/LoginDialog";
import api from "../../../utils/api/api";
import Cookies from "js-cookie";

interface CommentsProp {
	expanded: boolean;
	itemId: number;
	socket: Socket;
}

const CommentsList: React.FC<CommentsProp> = ({ expanded, itemId, socket }) => {
	const accessToken = Cookies.get("accessToken");
	const { user, isAuthenticated } = useAuth();
	const [token, setToken] = useState<string | undefined>(accessToken);
	const [newComment, setNewComment] = useState("");
	const [comments, setComments] = useState <Partial<IRowComment>[]>([]);
	const [error, setError] = useState<string | null>("null");
	const [loading, setLoading] = useState<boolean>(false);
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

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
			console.log("[Connected to Websocket]")
			socket.emit("joinRoom", itemId);
		});

		socket.on("error", (error) => {
			console.error(error);
		});

		socket.on("newComment", (data) => {
			console.log("[New Comment]", data)
			const { item, ...rest } = data;
			setComments((prevComments) => [rest, ...prevComments]);
		});

		socket.on("unauthenticated", async (data) => {
			try {
				await api.get("/auth");
				const token = Cookies.get("accessToken");
				setToken(token);
				socket.connect();
			} catch (error: any) {
				console.error(error.message);
			}
		});

		socket.on("unauthenticated-retry", async (data) => {
			console.log(data);
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

		if (newComment !== "") {
			socket.emit("createComment", {
				content: newComment,
				item_id: itemId,
			});

			setNewComment("");
		}
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
