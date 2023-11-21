import { ICustomField } from "./custom-fields";
import { ILike } from "./like";

export interface IItem {
	id?: number;
	name: string;
	custom_fields?: ICustomField[];
	likes?: ILike[];
	tags: string;
	[key: string]:
		| string
		| number
		| boolean
		| Date
		| ICustomField[]
		| ILike[]
		| string[]
		| undefined;
}

export interface IRowItem {
	id: number;
	name: string;
	custom_fields: ICustomField[];
	likes: ILike[];
	tags: string;
}