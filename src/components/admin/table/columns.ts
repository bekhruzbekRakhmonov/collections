import { Column } from "./Table";

export const collectionColumns: Column[] = [
	{ id: "id", label: "ID" },
	{ id: "name", label: "Name" },
	{ id: "description", label: "Description" },
];

export const commentColumns: Column[] = [
	{ id: "id", label: "ID" },
	{ id: "owner", label: "Author" },
	{ id: "content", label: "Content" },
];

export const customFieldColumns: Column[] = [
	{ id: "id", label: "ID" },
	{ id: "name", label: "Name" },
	{ id: "type", label: "Type" },
	{ id: "value", label: "Value" },
];

export const itemColumns: Column[] = [
	{ id: "id", label: "ID" },
	{ id: "name", label: "Name" },
	{ id: "tags", label: "Tags" },
];

export const userColumns: Column[] = [
	{ id: "id", label: "ID" },
	{ id: "name", label: "Name" },
	{ id: "email", label: "Email" },
	{ id: "role", label: "Role" },
	{ id: "status", label: "Status" },
	{ id: "created_at", label: "Joined" },
];