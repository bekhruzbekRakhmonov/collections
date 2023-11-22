import api from "../api";

export const likeOrUnlikeItem = async (itemId: number) => {
    try {
		const response = await api.post("/likes", {
            item_id: itemId
        });
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to fetch collections"
		);
	}
}
