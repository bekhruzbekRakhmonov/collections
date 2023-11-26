import { Snackbar } from "@mui/material";
import MuiAlert, { AlertColor } from "@mui/material/Alert";

interface SnackbarAlertProps {
    message: string | null;
	handleClose: () => void;
	open: boolean;
    severity: AlertColor;
}

const SnackbarAlert: React.FC<SnackbarAlertProps> = ({ handleClose, open, message, severity }) => {
    return (
		<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
			<MuiAlert
				elevation={6}
				variant="filled"
				onClose={handleClose}
				severity={severity}
			>
				{message}
			</MuiAlert>
		</Snackbar>
	);
}

export default SnackbarAlert;