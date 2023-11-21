import React from "react";

interface StepsComponentProps {
	children: React.ReactNode;
	activeStep: number;
    handleNext: () => void;
    handleSubmit: () => void;
}

const StepsComponent: React.FC<StepsComponentProps> = ({ children, activeStep, handleNext, handleSubmit }) => {
    const steps = React.Children.toArray(children) as React.ReactElement[];
    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
		handleNext();
		if (activeStep === steps.length - 2) {
			handleSubmit();
		}
    }
    return <form onSubmit={onSubmit}>{steps[activeStep]} {steps[steps.length-1]}</form>;
}

export default StepsComponent;