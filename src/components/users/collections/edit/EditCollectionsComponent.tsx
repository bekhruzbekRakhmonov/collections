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
	itemCustomFields: ICustomField[][];
	items: IItem[];
	setCollection: (data: React.SetStateAction<ICollection>) => void;
	setCustomFields: (data: React.SetStateAction<ICustomField[]>) => void;
	setItemCustomFields: (data: React.SetStateAction<ICustomField[][]>) => void;
	setItems: (data: React.SetStateAction<IItem[]>) => void;
	setRemovedItemsIds?: (data: React.SetStateAction<number[]>) => void;
	setRemovedItemCustomFieldsIds?: (data: React.SetStateAction<number[]>) => void;
	setRemovedCollectionCustomFieldsIds?: (data: React.SetStateAction<number[]>) => void;
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
  setRemovedItemsIds,
  setRemovedCollectionCustomFieldsIds,
  setRemovedItemCustomFieldsIds,
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
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
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
			  itemCustomFields={itemCustomFields}
			  setRemovedCollectionCustomFieldsIds={setRemovedCollectionCustomFieldsIds}
			  setRemovedItemCustomFieldsIds={setRemovedItemCustomFieldsIds}
            />
            <CreateItemStep
              items={items}
              setItems={setItems}
              customFields={customFields}
              itemCustomFields={itemCustomFields}
              setItemCustomFields={setItemCustomFields}
              setRemovedItemsIds={setRemovedItemsIds}
            />
            <BottomStepperButtons
              stepsLength={steps.length}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              handleBack={handleBack}
            />
          </StepsComponent>
        </>
      )}
    </Container>
  );
};

export default EditCollectionComponent;