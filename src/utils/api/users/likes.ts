import api from "../api";

export const likeItem = async (itemId: number) => {
    try {
		const response = await api.post("/likes/like", {
            item_id: itemId
        });
		return response.data.data.result;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to fetch collections"
		);
	}
}

export const unlikeItem = async (itemId: number) => {
	try {
		const response = await api.post("/likes/unlike", {
			item_id: itemId,
		});
		return response.data.data.result;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to fetch collections"
		);
	}
};
