import React, { useState } from "react";
import { MenuProps, Menu, alpha, styled, Avatar, CardHeader, IconButton, MenuItem, Snackbar } from "@mui/material";
import { Delete, MoreVert } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { useNavigate } from "react-router-dom";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../auth/AuthContext";
import { IUser } from "../../../utils/interfaces/user";

interface ItemCardHeaderProps {
	owner: IUser;
	created_at: string;
	itemId: number;
	handleOpenDeleteDialog: () => void;
	handleCloseDeleteDialog: () => void;
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

const ItemCardHeader: React.FC<ItemCardHeaderProps> = ({ owner, created_at, itemId, handleCloseDeleteDialog, handleOpenDeleteDialog }) => {
	const [copiedText, copyToClipboard] = useCopyToClipboard();
	const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
	const { t } = useTranslation();


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
	}

	const {user} = useAuth();

    return (
		<>
			<CardHeader
				avatar={
					<Avatar
						onClick={() =>
							owner && owner.id
								? navigate(`/users/${owner.id}`)
								: {}
						}
						sx={{ bgcolor: red[500] }}
						aria-label="recipe"
					>
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
							{user && owner?.id === user.id && (

								<>
									<MenuItem
										onClick={() =>
											navigate(
												`/edit-item/${itemId}`
											)
										}
										disableRipple
									>
										<EditIcon />
										{t("edit")}
									</MenuItem>
									<MenuItem
										onClick={() => {
											handleOpenDeleteDialog();
											setAnchorEl(null);
										}}
										disableRipple
									>
										<Delete />
										{t("delete")}
									</MenuItem>
								</>
							)}
							<MenuItem
								onClick={() => {
									copyToClipboard(
										window.location.host +
											`/show-item/${itemId}`
									);
									handleClose();
								}}
								disableRipple
							>
								<FileCopyIcon />
								{t("copyLink")}
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

export default ItemCardHeader