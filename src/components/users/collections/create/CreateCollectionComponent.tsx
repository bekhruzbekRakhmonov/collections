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
import StepsComponent from "./StepsComponent";
import CreateCollectionStep from "./steps/CreateCollectionStep";
import CreateCustomFieldStep from "./steps/CreateCustomFieldStep";
import CreateItemStep from "./steps/CreateItemStep";
import { ICollection } from "../../../../utils/interfaces/collection";
import { IItem } from "../../../../utils/interfaces/item";
import { ICustomField } from "../../../../utils/interfaces/custom-fields";
import BottomStepperButtons from "./utils/BottomStepperButtons";

const steps = ["Collection", "Custom Fields", "Items"];

interface CreateCollectionProps {
	collection: ICollection;
	customFields: ICustomField[];
	itemCustomFields: ICustomField[][];
	items: IItem[];
	setCollection: (data: React.SetStateAction<ICollection>) => void;
	setCustomFields: (data: React.SetStateAction<ICustomField[]>) => void;
	setItemCustomFields: (data: React.SetStateAction<ICustomField[][]>) => void;
	setItems: (data: React.SetStateAction<IItem[]>) => void;
	handleSubmit: () => void;
}

const CreateCollectionComponent: React.FC<CreateCollectionProps> = ({
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

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<Container sx={{ width: "100%" }}>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
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
							setItemCustomFields={setItemCustomFields}
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
							setActiveStep={setActiveStep}
							handleBack={handleBack}
						/>
					</StepsComponent>
				</React.Fragment>
			)}
		</Container>
	);
};

export default CreateCollectionComponent;
