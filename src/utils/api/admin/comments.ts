import { IComment, IRowComment } from "../../interfaces/comment";
import { adminApi as api } from "./api";

export const createComment = async (
	newComment: IComment
): Promise<IRowComment> => {
	try {
		const response = await api.post("/comments", newComment);
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to create custom field"
		);
	}
};

export const updateComment = async (
	commentId: number,
	updatedComment: IComment
): Promise<IRowComment> => {
	try {
		const response = await api.patch(
			`/comments/${commentId}`,
			updatedComment
		);
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to update comment"
		);
	}
};

export const deleteComment = async (commentId: number): Promise<void> => {
	try {
		await api.delete(`/comments/${commentId}`);
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to delete comment"
		);
	}
};

export const getComments = async (
	columnName?: string,
	q?: string,
	page: number = 1,
	limit: number = 5,
	order?: string,
	orderBy?: string
): Promise<{ data: IRowComment[]; total: number }> => {
	try {
		const response = await api.get("/comments", {
			params: {
				q,
				columnName,
				page,
				limit,
				order,
				orderBy,
			},
		});
		return {
			data: response.data.data.result,
			total: response.data.data.total,
		};
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to get comments"
		);
	}
};

export const getComment = async (commentId: number): Promise<IRowComment> => {
	try {
		const response = await api.get(`/comments/${commentId}`);
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to get comment"
		);
	}
};
