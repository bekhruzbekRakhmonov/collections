import React from "react";
import { Container, Typography } from "@mui/material";

const NotFoundPage: React.FC = () => {
	return (
		<Container>
			<Typography
				variant="h1"
				align="center"
				color="textPrimary"
				gutterBottom
			>
				404 - Not Found
			</Typography>
			<Typography
				variant="h5"
				align="center"
				color="textSecondary"
				paragraph
			>
				The page you are looking for might be under construction or does
				not exist.
			</Typography>
		</Container>
	);
};

export default NotFoundPage;
