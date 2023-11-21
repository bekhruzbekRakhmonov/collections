import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@mui/material";
import React from "react";
import Login from "../../../pages/auth/Login";

interface LoginDialogProps {
    open: boolean;
    handleClose: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, handleClose }) => {
    return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Login to add Comment</DialogTitle>
			<DialogContent>
				<Login />
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
			</DialogActions>
		</Dialog>
	);
}

export default LoginDialog;