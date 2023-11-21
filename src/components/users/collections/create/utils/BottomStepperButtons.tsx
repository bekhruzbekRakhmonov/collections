import { Box, Button } from "@mui/material";
import React from "react";

interface BottomStepperButtons {
	stepsLength: number;
	activeStep: number;
	skipped: Set<number>;
	setSkipped: (value: React.SetStateAction<Set<number>>) => void;
	setActiveStep: (value: React.SetStateAction<number>) => void;
	isStepOptional: (step: number) => boolean;
    handleBack: () => void;
}

const BottomStepperButtons: React.FC<BottomStepperButtons> = ({ stepsLength, activeStep, handleBack, setActiveStep, setSkipped, isStepOptional }) => {

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.");
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values());
			newSkipped.add(activeStep);
			return newSkipped;
		});
	};

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
			{isStepOptional(activeStep) && (
				<Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
					Skip
				</Button>
			)}
			<Button type="submit">
				{activeStep === stepsLength - 1 ? "Finish" : "Next"}
			</Button>
		</Box>
	);
};

export default BottomStepperButtons;