import { ICustomField, IRowCustomField } from "../../interfaces/custom-fields";
import { adminApi as api } from "./api";

export const createCustomField = async (
	newCustomFieldData: ICustomField
): Promise<IRowCustomField> => {
	try {
		const response = await api.post(
			"/custom-fields",
			newCustomFieldData
		);
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to create custom field"
		);
	}
};

export const getCustomFields = async (
	columnName?: string,
	q?: string,
	page: number = 1,
	limit: number = 5,
	order?: string,
	orderBy?: string
) => {
	try {
		const response = await api.get("/custom-fields", {
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
			error.response?.data.message || "Failed to fetch Custom Fields"
		);
	}
};

export const updateCustomField = async (customFieldId: number, updatedCustomField: ICustomField) => {
	try {
		const response = await api.patch(`/custom-fields/${customFieldId}`, {...updatedCustomField});
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message ||
				`Failed to update custom field with ID ${customFieldId}`
		);
	}
};

export const getCustomField = async (customFieldId: number) => {
	try {
		const response = await api.get(`/custom-fields/${customFieldId}`);
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message ||
				`Failed to fetch custom field with ID ${customFieldId}`
		);
	}
};

export const deleteCustomField = async (customFieldId: string) => {
	try {
		const response = await api.delete(`/custom-fields/${customFieldId}`);
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message ||
				`Failed to delete custom field with ID ${customFieldId}`
		);
	}
};