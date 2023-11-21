import React from "react";
import { CircularProgress } from "@mui/material";

const Loading: React.FC = () => {
    return (
		<div style={{ display: "flex", alignItems:"center", justifyContent: "center" }}>
			<CircularProgress />
		</div>
	);
}

export default Loading;