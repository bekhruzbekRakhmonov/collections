import React, { CSSProperties } from "react";
import { Typography, Paper, Container } from "@mui/material";

const errorContainerStyle: CSSProperties = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	height: "100vh",
};

const errorContentStyle: CSSProperties = {
	textAlign: "center",
	padding: "20px",
	border: "1px solid #d32f2f", // Dark red border for emphasis
	backgroundColor: "#ffcdd2", // Light red background
	color: "#d32f2f", // Dark red text color
	borderRadius: "8px",
	maxWidth: "400px", // Limiting the width for better readability
};

interface ErrorComponentProps {
	show: boolean;
	errorMessage: string | null;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
	errorMessage,
	show,
}) => {
	return (
		<Container style={{ ...errorContainerStyle, display: show ? "flex" : "none" }}>
			<Paper elevation={3} style={errorContentStyle}>
				<Typography
					variant="h6"
					style={{ color: "#d32f2f", marginBottom: "10px" }}
				>
					Oops! Something went wrong.
				</Typography>
				<Typography variant="body1">{errorMessage}</Typography>
			</Paper>
		</Container>
	);
};

export default ErrorComponent;
