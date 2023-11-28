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
	Ballot,
	Collections,
	CollectionsBookmark,
	Comment,
	Group,
	Inbox,
	Logout,
	Mail,
} from "@mui/icons-material";
import SimpleTable, { Column } from "../../../components/admin/table/Table";
import { IRowUser, IUser } from "../../../utils/interfaces/user";
import { admin } from "../../../utils/api/admin";
import { ICollection, IRowCollection } from "../../../utils/interfaces/collection";
import { IItem, IRowItem } from "../../../utils/interfaces/item";
import { useLocation, useNavigate } from "react-router-dom";
import { IRowComment } from "../../../utils/interfaces/comment";
import UsersTable from "./tables/UsersTable";
import CollectionsTable from "./tables/CollectionsTable";
import ItemsTable from "./tables/ItemsTable";
import CommentsTable from "./tables/CommentsTable";
import CustomFieldsTable from "./tables/CustomFieldsTable";

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

export default function Dashboard() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(true);
	const [selectedOption, setSelectedOption] = React.useState(window.location.href.split("#")[1]);
	const navigate = useNavigate();

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleSidebarItemClick = (option: string) => {
		setSelectedOption(option);
		window.location.hash = option.split(" ").join("");
	};

	const renderMainContent = () => {
		switch (selectedOption) {
			case "Users":
				return <UsersTable />;
			case "Collections":
				return <CollectionsTable />;
			case "Items":
				return <ItemsTable />;
			case "Custom Fields":
				return <CustomFieldsTable />;
			case "Comments":
				return <CommentsTable />;
			default:
				return (
					<Typography paragraph>
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
						Admin Dashboard
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
						selected={
							selectedOption === "Users" ||
							window.location.hash === "#Users"
						}
					/>
					<SidebarItem
						icon={<Collections />}
						text="Collections"
						onClick={() => handleSidebarItemClick("Collections")}
						selected={
							selectedOption === "Collections" ||
							window.location.hash === "#Collections"
						}
					/>
					<SidebarItem
						icon={<CollectionsBookmark />}
						text="Items"
						onClick={() => handleSidebarItemClick("Items")}
						selected={
							selectedOption === "Items" ||
							window.location.hash === "#Items"
						}
					/>
					<SidebarItem
						icon={<Ballot />}
						text="Custom Fields"
						onClick={() => handleSidebarItemClick("Custom Fields")}
						selected={
							selectedOption === "Custom Fields" ||
							window.location.hash === "#CustomFields"
						}
					/>
					<SidebarItem
						icon={<Comment />}
						text="Comments"
						onClick={() => handleSidebarItemClick("Comments")}
						selected={
							selectedOption === "Comments" ||
							window.location.hash === "#Comments"
						}
					/>
				</List>
				<Divider />
				<List>
					<ListItem disablePadding>
						<ListItemButton onClick={() => navigate("/logout")}>
							<ListItemIcon>
								<Logout />
							</ListItemIcon>
							<ListItemText primary="Log out" />
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
			<Main open={open}>{renderMainContent()}</Main>
		</Box>
	);
}
