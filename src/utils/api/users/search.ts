import api from "../api";

export const search = async (query: string,
	page: number = 1,
	limit: number = 5,
	order?: string,
	orderBy?: string
): Promise<any> => {
	try {
		const response = await api.get(`/search/${query}`, {
			params: {
				page,
				limit,
				order,
				orderBy,
			},
		});
        console.log(response)
		return {
			data: response.data.data.result,
			total: response.data.data.total,
		};
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to fetch search results"
		);
	}
};


export const searchTags = async (
	tag: string,
): Promise<any> => {
	try {
		const response = await api.get(`/search-tags/?q=${tag}`);
		return response.data.data
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to fetch search results"
		);
	}
};