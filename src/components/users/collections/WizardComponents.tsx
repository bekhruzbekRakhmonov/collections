import React from "react";
import { useField, FieldAttributes, Form, Formik } from "formik";
import { TextField, Button, Container, Typography } from "@mui/material";
import * as Yup from "yup";

interface WizardProps {
	children: React.ReactNode;
	initialValues: any;
	onSubmit: (values: any, bag: any) => Promise<void>;
}

const Wizard: React.FC<WizardProps> = ({
	children,
	initialValues,
	onSubmit,
}) => {
	const [stepNumber, setStepNumber] = React.useState(0);
	const steps = React.Children.toArray(children) as React.ReactElement[];
	const [snapshot, setSnapshot] = React.useState(initialValues);

	const step = steps[stepNumber];
	const totalSteps = steps.length;
	const isLastStep = stepNumber === totalSteps - 1;

	const next = (values: any) => {
		setSnapshot(values);
		setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
	};

	const previous = (values: any) => {
		setSnapshot(values);
		setStepNumber(Math.max(stepNumber - 1, 0));
	};

	const handleSubmit = async (values: any, bag: any) => {
		if (
			step &&
			React.isValidElement(step) &&
			(step.props as any).onSubmit
		) {
			await (step.props as any).onSubmit(values, bag);
		}
		if (isLastStep) {
			return onSubmit(values, bag);
		} else {
			bag.setTouched({});
			next(values);
		}
	};

	return (
		<Formik
			initialValues={snapshot}
			onSubmit={handleSubmit}
			validationSchema={
				step && React.isValidElement(step)
					? (step.props as any).validationSchema
					: undefined
			}
		>
			{(formik) => (
				<Form>
					<Container>
						<Typography variant="h6" gutterBottom>
							Step {stepNumber + 1} of {totalSteps}
						</Typography>
						{step}
						<div style={{ display: "flex", marginTop: "1rem" }}>
							{stepNumber > 0 && (
								<Button
									variant="contained"
									onClick={() => previous(formik.values)}
									type="button"
								>
									Back
								</Button>
							)}
							<div style={{ marginLeft: "auto" }}>
								<Button
									disabled={formik.isSubmitting}
									variant="contained"
									color="primary"
									type="submit"
								>
									{isLastStep ? "Submit" : "Next"}
								</Button>
							</div>
						</div>
					</Container>
				</Form>
			)}
		</Formik>
	);
};

interface WizardStepProps {
	children: React.ReactNode;
	onSubmit?: (values: any) => void;
	validationSchema?: Yup.ObjectSchema<any>;
}

const MyTextField: React.FC<
	FieldAttributes<any> & { label: string; variant: string }
> = ({ label, variant, ...props }) => {
	const [field, meta] = useField(props);

	return (
		<TextField
			{...field}
			{...props}
			label={label}
			variant={variant}
			error={meta.touched && Boolean(meta.error)}
			helperText={meta.touched && meta.error}
		/>
	);
};

const WizardStep: React.FC<WizardStepProps> = ({ children }) => <>{children}</>;

export { Wizard, WizardStep, MyTextField };
