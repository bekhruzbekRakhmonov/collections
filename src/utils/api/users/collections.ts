import api from "../../api";
import { ICollection } from "../../interfaces/collection";

export const getCollections = async () => {
    const response = await api.get('/collections');
    return response.data;
}

export const getCollection = async (id: number) => {
	const response = await api.get("/collections/" + id);
	return response.data;
};

export const createCollection = async (data: ICollection) => {
	const response = await api.post("/collections", {...data, tags: ["ds", "fdf"]});
	console.log(response)
    // if (response.status >= 400) {
    //     throw new Error(response.data.message)
    // }
	return response.data;
};

export const updateCollection = async (data: ICollection) => {
	const response = await api.patch("/collections", data);
	if (response.status >= 400) {
		throw new Error(response.data.message);
	}
	return response.data;
};

export const deleteCollection = async (id: number) => {
	const response = await api.delete("/collections/" + id);
	if (response.status >= 400) {
		throw new Error(response.data.message);
	}
	return response.data;
};