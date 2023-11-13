import { ICustomField } from "./custom-fields";

export interface IItem {
	id?: number;
	name: string;
	custom_fields?: ICustomField[];
	[key: string]:
		| string
		| number
		| boolean
		| Date
		| ICustomField[]
		| undefined;
}