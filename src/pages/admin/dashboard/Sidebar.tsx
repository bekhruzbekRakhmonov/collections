import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "../../../components/admin/appbar/Appbar";
import {
	Collections,
	CollectionsBookmark,
	Comment,
	Group,
	Inbox,
	Mail,
} from "@mui/icons-material";
import SimpleTable from "../../../components/admin/table/Table";
import { IUser } from "../../../utils/interfaces/user";
import { admin } from "../../../utils/api/admin";
import { ICollection } from "../../../utils/interfaces/collection";
import { IItem } from "../../../utils/interfaces/item";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
	open?: boolean;
}>(({ theme, open }) => ({
	flexGrow: 1,
	padding: theme.spacing(3),
	transition: theme.transitions.create("margin", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: `-${drawerWidth}px`,
	...(open && {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	}),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

interface SidebarItemProps {
	icon: React.ReactNode,
	text: string,
	onClick: (e: React.SyntheticEvent) => void;
	selected: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, onClick, selected }) => (
	<ListItemButton onClick={onClick} selected={selected}>
		<ListItemIcon>{icon}</ListItemIcon>
		<ListItemText primary={text} />
	</ListItemButton>
);

interface Column {
	id: string;
	label: string;
}

interface UserData {
	id: number;
	name: string;
	email: string;
}

interface CollectionData {
	id: number;
	name: string;
	description: string;
}

interface ItemData {
	id: number;
	name: string;
	price: number;
}

interface CommentData {
	id: number;
	author: string;
	content: string;
}

// Sample Data
const users: UserData[] = [
	{ id: 1, name: "John Doe", email: "john@example.com" },
	{ id: 2, name: "Jane Doe", email: "jane@example.com" },
];

const collections: CollectionData[] = [
	{
		id: 1,
		name: "Nature Collection",
		description: "Beautiful nature photos",
	},
	{ id: 2, name: "Cityscape Collection", description: "City skyline images" },
];

const items: ItemData[] = [
	{ id: 1, name: "Camera", price: 500 },
	{ id: 2, name: "Laptop", price: 1200 },
];

const comments: CommentData[] = [
	{ id: 1, author: "User1", content: "Great collection!" },
	{ id: 2, author: "User2", content: "Love the items in this collection." },
];

// Columns for the tables
const userColumns: Column[] = [
	{ id: "id", label: "ID" },
	{ id: "name", label: "Name" },
	{ id: "email", label: "Email" },
];

const collectionColumns: Column[] = [
	{ id: "id", label: "ID" },
	{ id: "name", label: "Name" },
	{ id: "description", label: "Description" },
];

const itemColumns: Column[] = [
	{ id: "id", label: "ID" },
	{ id: "name", label: "Name" },
	{ id: "price", label: "Price" },
];

const commentColumns: Column[] = [
	{ id: "id", label: "ID" },
	{ id: "author", label: "Author" },
	{ id: "content", label: "Content" },
];

export default function SideBar() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(true);
	const [selectedOption, setSelectedOption] = React.useState("Users"); // Initial selected option
	
	// Data stores
	const [usersData, setUsersData] = React.useState<{
		data: Record<string, any>[];
		total: number;
	}>({data: [], total: 0});
	const [collectionsData, setCollectionsData] = React.useState<{
		data: Record<string, any>[];
		total: number;
	}>({ data: [], total: 0 });
	const [itemsData, setItemsData] = React.useState<{
		data: Record<string, any>[];
		total: number;
	}>({ data: [], total: 0 });
	const [commentsData, setCommentsData] = React.useState<{
		data: Record<string, any>[];
		total: number;
	}>({ data: [], total: 0 });

	const getUsers = (page?: number, limit?: number, order?: string, orderBy?: string) => {
		(async () => {
			const result = await admin.getUsers(page, limit, order, orderBy);
			setUsersData(result);
		})();
	}

	const getCollections = (
		page?: number,
		limit?: number,
		order?: string,
		orderBy?: string
	) => {
		console.log(page, limit);
		(async () => {
			const result = await admin.getCollections(page, limit, order, orderBy);
			setCollectionsData(result);
			console.log(result)
		})();
	};

	const getItems = (
		page?: number,
		limit?: number,
		order?: string,
		orderBy?: string
	) => {
		(async () => {
			const result = await admin.getItems(
				page,
				limit,
				order,
				orderBy
			);
			setItemsData(result);
		})();
	};

	React.useEffect(() => {
		getUsers();
		getCollections();
		getItems();
	}, [])

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleSidebarItemClick = (option: string) => {
		setSelectedOption(option);
	};

	const renderMainContent = () => {
		switch (selectedOption) {
			case "Users":
				const userColumns = [
					{ id: "id", label: "ID" },
					{ id: "name", label: "Name" },
					{ id: "email", label: "Email" },
					{ id: "role", label: "Role" },
					{ id: "status", label: "Status" },
					{ id: "created_at", label: "Joined" },
				];
				return (
					<SimpleTable
					key="users"
						result={usersData}
						columns={userColumns}
						containerStyle={{ marginTop: "60px" }}
						onEdit={(id) => console.log(id)}
						onDelete={(id) => console.log(id)}
						onDeleteSelected={() => console.log("selected")}
						refreshData={getUsers}
					/>
				);
			case "Collections":
				// Similar structure for other cases
				return (
					<SimpleTable
						key="collections"
						result={collectionsData}
						columns={collectionColumns}
						containerStyle={{ marginTop: "60px" }}
						onEdit={(id) => console.log(id)}
						onDelete={(id) => console.log(id)}
						onBlock={(id) => console.log(id)}
						refreshData={getCollections}
					/>
				);
			case "Items":
				return (
					<SimpleTable
						key="items"
						result={itemsData}
						columns={itemColumns}
						containerStyle={{ marginTop: "60px" }}
						onEdit={(id) => console.log(id)}
						onDelete={(id) => console.log(id)}
						refreshData={getItems}
					/>
				);
			case "Comments":
				return (
					<SimpleTable
						key="comments"
						result={collectionsData}
						columns={commentColumns}
						containerStyle={{ marginTop: "60px" }}
						onEdit={(id) => console.log(id)}
						onDelete={(id) => console.log(id)}
						refreshData={getUsers}
					/>
				);
			default:
				return (
					<Typography paragraph>
						{/* Default content */}
						Lorem ipsum dolor sit amet, consectetur adipiscing
						elit...
					</Typography>
				);
		}
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" open={open} drawerWidth={drawerWidth}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ mr: 2, ...(open && { display: "none" }) }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Persistent drawer
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "ltr" ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					<SidebarItem
						icon={<Group />}
						text="Users"
						onClick={() => handleSidebarItemClick("Users")}
						selected={selectedOption === "Users"}
					/>
					<SidebarItem
						icon={<Collections />}
						text="Collections"
						onClick={() => handleSidebarItemClick("Collections")}
						selected={selectedOption === "Collections"}
					/>
					<SidebarItem
						icon={<CollectionsBookmark />}
						text="Items"
						onClick={() => handleSidebarItemClick("Items")}
						selected={selectedOption === "Items"}
					/>
					<SidebarItem
						icon={<Comment />}
						text="Comments"
						onClick={() => handleSidebarItemClick("Comments")}
						selected={selectedOption === "Comments"}
					/>
				</List>
				<Divider />
				<List>
					{["All mail", "Trash", "Spam"].map((text, index) => (
						<ListItem key={text} disablePadding>
							<ListItemButton>
								<ListItemIcon>
									{index % 2 === 0 ? (
										<Inbox />
									) : (
										<Mail />
									)}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
			<Main open={open}>{renderMainContent()}</Main>
		</Box>
	);
}
