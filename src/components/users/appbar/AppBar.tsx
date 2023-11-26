import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CollectionsIcon from "@mui/icons-material/Collections";
import Switch from "@mui/material/Switch";
import LanguageIcon from "@mui/icons-material/Language";
import TextField from "@mui/material/TextField";
import { Chip, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import { DarkMode, LightMode } from "@mui/icons-material";
import { SupportedLanguages } from "../../../utils/i18/enums";
import { useTranslation } from "react-i18next";
import SearchInput from "./SearchInput";

interface ResponsiveAppBarProps {
	handleDarkModeToggle: () => void;
	darkMode: boolean;
	language: SupportedLanguages;
	setLanguage: (language: SupportedLanguages) => void;
}

const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({
	handleDarkModeToggle,
	darkMode,
	language,
	setLanguage,
}) => {
	const navigate = useNavigate();
	const { user, isAuthenticated } = useAuth();
	const { t } = useTranslation();

	const pages = [
		{ label: "Feed", link: "/" },
		{ label: "Profile", link: isAuthenticated ? `/users/${user.id}` : '/login' },
	];
	const settings = [
		{ label: "Profile", link: `/users/${user?.id || ''}` },
		{ label: "Settings", link: "/settings" },
		{ label: t("logout"), link: "/logout" },
	];

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);
	const [searchQuery, setSearchQuery] = React.useState("");

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLanguageChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setLanguage(event.target.value as SupportedLanguages);
	};

	const handleSearchInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSearchQuery(event.target.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			navigate(`/search/?q=${searchQuery}`)
		}
	};

	return (
		<AppBar position="static" color="inherit">
			<Container maxWidth="xl">
				<Toolbar
					disableGutters
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<div style={{ display: "flex" }}>
						<CollectionsIcon
							sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
						/>
						<Typography
							variant="h6"
							noWrap
							component="a"
							href="/"
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							Collections
						</Typography>

						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "flex", md: "none" },
							}}
						>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar-nav"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: "block", md: "none" },
								}}
							>
								{pages.map((page) => (
									<MenuItem
										key={page.label}
										onClick={() => {
											handleCloseNavMenu();
											navigate(page.link);
										}}
									>
										<Typography textAlign="center">
											{page.label}
										</Typography>
									</MenuItem>
								))}
								<Divider />
								<MenuItem>
									<TextField
										select
										value={language}
										onChange={handleLanguageChange}
										size="small"
										variant="outlined"
										InputProps={{
											startAdornment: (
												<IconButton
													color="inherit"
													size="small"
												>
													<LanguageIcon />
												</IconButton>
											),
										}}
									>
										<MenuItem value="en">English</MenuItem>
										<MenuItem value="uz">Uzbek</MenuItem>
									</TextField>
								</MenuItem>
								<Divider />
								<MenuItem>
									<Box
										sx={{
											paddingLeft: "3px",
											paddingRight: "3px",
											alignItems: "center",
											display: "flex",
										}}
									>
										<LightMode />
										<Switch
											checked={darkMode}
											onChange={handleDarkModeToggle}
											color="default"
										/>
										<DarkMode />
									</Box>
								</MenuItem>
							</Menu>
						</Box>

						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "none", md: "flex" },
							}}
						>
							{pages.map((page) => (
								<Button
									key={page.label}
									onClick={() => navigate(page.link)}
									color="inherit"
								>
									{page.label}
								</Button>
							))}
						</Box>
					</div>

					<Box
						sx={{
							alignItems: "center",
							justifyContent: "center",
							flexGrow: 1,
							display: { xs: "flex", md: "none" },
						}}
					>
						<SearchInput
							style={{ minWidth: "200px" }}
							searchQuery={searchQuery}
							onChange={handleSearchInputChange}
							onKeyDown={handleKeyDown}
						/>
					</Box>

					<Box
						sx={{
							alignItems: "center",
							justifyContent: "center",
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
						}}
					>
						<SearchInput
							style={{ minWidth: "450px" }}
							searchQuery={searchQuery}
							onChange={handleSearchInputChange}
							onKeyDown={handleKeyDown}
						/>
					</Box>

					<Box
						sx={{
							display: "flex",
							alignItems: "center",
						}}
					>
						<Tooltip title="Toggle Dark Mode">
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									borderRadius: "5px",
									marginRight: "5px",
								}}
							>
								<Box
									sx={{
										paddingLeft: "3px",
										paddingRight: "3px",
										alignItems: "center",
										flexGrow: 1,
										display: { xs: "none", md: "flex" },
									}}
								>
									<LightMode />
									<Switch
										checked={darkMode}
										onChange={handleDarkModeToggle}
										color="default"
									/>
									<DarkMode />
								</Box>
							</Box>
						</Tooltip>
						<Tooltip
							title={null}
							sx={{
								flexGrow: 1,
								display: { xs: "none", md: "flex" },
								marginRight: "5px",
							}}
						>
							<TextField
								select
								value={language}
								onChange={handleLanguageChange}
								size="small"
								variant="outlined"
								InputProps={{
									startAdornment: (
										<IconButton
											color="inherit"
											size="small"
										>
											<LanguageIcon />
										</IconButton>
									),
								}}
							>
								<MenuItem value="en">English</MenuItem>
								<MenuItem value="uz">Uzbek</MenuItem>
							</TextField>
						</Tooltip>

						{user && isAuthenticated ? (
							<>
								<Tooltip
									title="Open settings"
									sx={{
										flexGrow: 1,
										display: { xs: "none", md: "flex" },
									}}
								>
									<Chip
										onClick={handleOpenUserMenu}
										avatar={
											<Avatar
												alt={user.name}
												src="/static/images/avatar/1.jpg"
											/>
										}
										label={user.name}
										variant="outlined"
									/>
								</Tooltip>
								<Tooltip
									title="Open settings"
									sx={{
										flexGrow: 1,
										display: { xs: "flex", md: "none" },
										border: "1px solid black",
									}}
								>
									<Avatar
										onClick={handleOpenUserMenu}
										alt="b"
										src="/static/images/avatar/1.jpg"
									/>
								</Tooltip>
							</>
						) : (
							<Button
								variant="outlined"
								color="success"
								onClick={() => navigate("/login")}
							>
								{t("login")}
							</Button>
						)}
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar-user"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map(({ label, link }, index) => (
								<MenuItem
									key={index}
									onClick={() => {
										handleCloseUserMenu();
										navigate(link);
									}}
								>
									<Typography textAlign="center">
										{label}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default ResponsiveAppBar;
