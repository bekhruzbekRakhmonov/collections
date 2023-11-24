import { Box, Button } from "@mui/material";
import React from "react";

interface BottomStepperButtons {
	stepsLength: number;
	activeStep: number;
	setActiveStep: (value: React.SetStateAction<number>) => void;
    handleBack: () => void;
}

const BottomStepperButtons: React.FC<BottomStepperButtons> = ({ stepsLength, activeStep, handleBack, setActiveStep}) => {

    return (
		<Box sx={{ display: "flex", flexDirection: "row", pt: 2, mb: "15px" }}>
			<Button
				color="inherit"
				disabled={activeStep === 0}
				onClick={handleBack}
				sx={{ mr: 1 }}
			>
				Back
			</Button>
			<Box sx={{ flex: "1 1 auto" }} />
			<Button type="submit">
				{activeStep === stepsLength - 1 ? "Finish" : "Next"}
			</Button>
		</Box>
	);
};

export default BottomStepperButtons;