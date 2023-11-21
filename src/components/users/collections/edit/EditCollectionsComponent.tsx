import React from "react";
import {
	Box,
	Stepper,
	Typography,
	Step,
	StepLabel,
	Button,
	Container,
} from "@mui/material";
import { ICollection } from "../../../../utils/interfaces/collection";
import { ICustomField } from "../../../../utils/interfaces/custom-fields";
import { IItem } from "../../../../utils/interfaces/item";
import StepsComponent from "../create/StepsComponent";
import CreateCollectionStep from "../create/steps/CreateCollectionStep";
import CreateCustomFieldStep from "../create/steps/CreateCustomFieldStep";
import CreateItemStep from "../create/steps/CreateItemStep";
import BottomStepperButtons from "../create/utils/BottomStepperButtons";

const steps = ["Collection", "Custom Fields", "Items"];

interface CreateCollectionProps {
	collection: ICollection;
	customFields: ICustomField[];
	itemCustomFields: ICustomField[];
	items: IItem[];
	setCollection: (data: React.SetStateAction<ICollection>) => void;
	setCustomFields: (data: React.SetStateAction<ICustomField[]>) => void;
	setItemCustomFields: (data: React.SetStateAction<ICustomField[]>) => void;
	setItems: (data: React.SetStateAction<IItem[]>) => void;
	handleSubmit: () => void;
}

const EditCollectionComponent: React.FC<CreateCollectionProps> = ({
	collection,
	customFields,
	itemCustomFields,
	items,
	setCollection,
	setItems,
	setCustomFields,
	setItemCustomFields,
	handleSubmit,
}) => {
	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set<number>());

	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const isStepOptional = (step: number) => {
		return step === 1;
	};

	const isStepSkipped = (step: number) => {
		return skipped.has(step);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<Container sx={{ width: "100%" }}>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					const stepProps: { completed?: boolean } = {};
					const labelProps: {
						optional?: React.ReactNode;
					} = {};
					if (isStepOptional(index)) {
						labelProps.optional = (
							<Typography variant="caption">Optional</Typography>
						);
					}
					if (isStepSkipped(index)) {
						stepProps.completed = false;
					}
					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			{activeStep === steps.length ? (
				<React.Fragment>
					<Typography sx={{ mt: 2, mb: 1 }}>
						All steps completed - you&apos;re finished
					</Typography>
					<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
						<Box sx={{ flex: "1 1 auto" }} />
						<Button onClick={handleReset}>Reset</Button>
					</Box>
				</React.Fragment>
			) : (
				<React.Fragment>
					<StepsComponent
						activeStep={activeStep}
						handleNext={handleNext}
						handleSubmit={handleSubmit}
					>
						<CreateCollectionStep
							collection={collection}
							setCollection={setCollection}
						/>
						<CreateCustomFieldStep
							customFields={customFields}
							setCustomFields={setCustomFields}
						/>
						<CreateItemStep
							items={items}
							setItems={setItems}
							customFields={customFields}
							itemCustomFields={itemCustomFields}
							setItemCustomFields={setItemCustomFields}
						/>
						<BottomStepperButtons
							stepsLength={steps.length}
							activeStep={activeStep}
							skipped={skipped}
							setActiveStep={setActiveStep}
							setSkipped={setSkipped}
							isStepOptional={isStepOptional}
							handleBack={handleBack}
						/>
					</StepsComponent>
				</React.Fragment>
			)}
		</Container>
	);
};

export default EditCollectionComponent;
