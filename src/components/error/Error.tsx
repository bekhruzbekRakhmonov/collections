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
	border: "1px solid #ff0000", // Red border for emphasis
	backgroundColor: "#ffebee", // Light red background
	color: "#ff0000", // Red text color
	borderRadius: "8px",
};

const ErrorComponent: React.FC<{ errorMessage: string }> = ({ errorMessage }) => {
	return (
		<Container style={errorContainerStyle}>
			<Paper elevation={3} style={errorContentStyle}>
				<Typography variant="h6">Error</Typography>
				<Typography variant="body1">{errorMessage}</Typography>
			</Paper>
		</Container>
	);
};

export default ErrorComponent;
