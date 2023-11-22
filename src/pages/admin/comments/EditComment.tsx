import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Typography, Container, Box, FormLabel, FormControl } from "@mui/material";
import { admin } from "../../../utils/api/admin";
import { IComment } from "../../../utils/interfaces/comment";

interface EditCommentProps {
}

interface FormData extends IComment {
}

export const EditComment: React.FC<EditCommentProps> = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormData>();

	useEffect(() => {
		const fetchCommentData = async () => {
			try {;
				const data = await admin.getComment(Number(id));

				setValue("content", data.content);
			} catch (error) {
				console.error("Error fetching comment data:", error);
			}
		};

		fetchCommentData();
	}, [id, setValue]);

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			await admin.updateComment(Number(id), data)

			navigate(-1);
		} catch (error) {
			console.error("Error updating comment data:", error);
		}
	};

	return (
		<Container>
			<Typography variant="h4" gutterBottom>
				Edit Comment
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box marginBottom={2}>
					<FormControl fullWidth>
						<FormLabel>Content</FormLabel>
						<TextField
							fullWidth
							multiline
							rows={4}
							{...register("content", {
								required: "Content is required",
							})}
							error={!!errors.content}
							helperText={errors.content?.message}
						/>
					</FormControl>
				</Box>
				<Button type="submit" variant="contained" color="primary">
					Save Changes
				</Button>
			</form>
		</Container>
	);
};
