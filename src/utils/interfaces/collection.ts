import { ICustomField } from "./custom-fields";
import { IItem } from "./item";

export interface ICollection {
    id?: number;
    name: string;
    topic: string;
    tags: string[];
    description: string;
    items: IItem[];
    custom_fields: ICustomField[];
}