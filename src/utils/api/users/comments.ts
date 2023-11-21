import { IRowComment } from "../../interfaces/comment";
import api from "../api";

export const getComments = async (
	itemId: number,
	page: number
): Promise<IRowComment[]> => {
	try {
		const response = await api.get(`/items/${itemId}/comments`);
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to fetch comments"
		);
	}
};

export const getComment = async (id: number | string) => {
	try {
		const response = await api.get(`/comments/${id}`);
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to fetch comment"
		);
	}
};
