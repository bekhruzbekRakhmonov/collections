import React, { useState } from "react";
import { IUser } from "../../../../utils/interfaces/user";
import { MenuProps, Menu, alpha, styled, Avatar, CardHeader, Divider, IconButton, MenuItem, Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, useTheme } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../auth/AuthContext";
import { useCopyToClipboard } from "@uidotdev/usehooks";

interface CollectionCardHeaderProps {
	owner: IUser;
	created_at: string;
	collectionId: number,
}

const StyledMenu = styled((props: MenuProps) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "right",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "right",
		}}
		{...props}
	/>
))(({ theme }) => ({
	"& .MuiPaper-root": {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		color:
			theme.palette.mode === "light"
				? "rgb(55, 65, 81)"
				: theme.palette.grey[300],
		boxShadow:
			"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
		"& .MuiMenu-list": {
			padding: "4px 0",
		},
		"& .MuiMenuItem-root": {
			"& .MuiSvgIcon-root": {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			"&:active": {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity
				),
			},
		},
	},
}));

const CollectionCardHeader: React.FC<CollectionCardHeaderProps> = ({ owner, created_at, collectionId }) => {
	const [copiedText, copyToClipboard] = useCopyToClipboard();
	const [snackbarOpen, setSnackbarOpen] = useState<boolean>(true);
	const theme = useTheme();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const navigate = useNavigate();
    const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
		setSnackbarOpen(true);
	};

	const handleSnackbarClose = () => {
		setSnackbarOpen(false)
		copyToClipboard("");
	}

	const {user} = useAuth();

    return (
		<>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
						{/* {owner && owner.name[0]} */}
					</Avatar>
				}
				action={
					<div>
						<IconButton
							aria-label="settings"
							id="fade-button"
							aria-controls={open ? "fade-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={open ? "true" : undefined}
							onClick={handleClick}
						>
							<MoreVert />
						</IconButton>
						<StyledMenu
							id="demo-customized-menu"
							MenuListProps={{
								"aria-labelledby": "demo-customized-button",
							}}
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
						>
							{user && owner.id === user.id && (
								<MenuItem
									onClick={() =>
										navigate(
											`/edit-collection/${collectionId}`
										)
									}
									disableRipple
								>
									<EditIcon />
									Edit
								</MenuItem>
							)}
							<MenuItem
								onClick={() => {
									copyToClipboard(
										window.location +
											`show-collection/${collectionId}`
									);
									handleClose();
								}}
								disableRipple
							>
								<FileCopyIcon />
								Copy Link
							</MenuItem>
							<Divider sx={{ my: 0.5 }} />
							<MenuItem onClick={handleClose} disableRipple>
								<ArchiveIcon />
								Archive
							</MenuItem>
							<MenuItem onClick={handleClose} disableRipple>
								<MoreHorizIcon />
								More
							</MenuItem>
						</StyledMenu>
					</div>
				}
				title={(owner && owner.name) || ""}
				subheader={new Date(created_at).toLocaleString()}
			/>
			{copiedText && (
				<Snackbar
					transitionDuration={100}
					anchorOrigin={{ vertical: "top", horizontal: "center" }}
					open={snackbarOpen}
					onClose={handleSnackbarClose}
					message="Link copied to clipboard 🎉"
					autoHideDuration={1000}
				/>
			)}
		</>
	);
}

export default CollectionCardHeader