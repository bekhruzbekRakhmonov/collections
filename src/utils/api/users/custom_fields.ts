import api from "../api";

export const getCustomFields = async (page: number) => {
	try {
		const response = await api.get("/custom-fields");
		return response.data.data.result;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to fetch Custom Fields"
		);
	}
};

export const getCustomField = async (customFieldId: string) => {
	try {
		const response = await api.get(`/custom-fields/${customFieldId}`);
		return response.data.data.customField;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message ||
				`Failed to fetch custom field with ID ${customFieldId}`
		);
	}
};

export const updateCustomField = async (
	customFieldId: string,
	updatedData: any
) => {
	try {
		const response = await api.put(
			`/custom-fields/${customFieldId}`,
			updatedData
		);
		return response.data.data.customField;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message ||
				`Failed to update custom field with ID ${customFieldId}`
		);
	}
};

export const deleteCustomField = async (customFieldId: string) => {
	try {
		const response = await api.delete(`/custom-fields/${customFieldId}`);
		return response.data.data.message;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message ||
				`Failed to delete custom field with ID ${customFieldId}`
		);
	}
};
