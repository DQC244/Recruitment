import React, { ReactNode } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  BoxProps,
  ButtonProps,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";

const HorizontalLinearStepper = ({
  steps,
  activeStep,
  onNext,
  onBack,
  nextProps,
  buttonCheckout,
  ...otherProps
}: HorizontalLinearStepperProps) => {
  const classes = useStyles();

  const handleBack = () => {
    onBack();
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <Box sx={{ width: "100%" }} {...otherProps}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              classes={{
                labelContainer: classes.labelContainer,
              }}
              StepIconProps={{
                classes: {
                  root: classes.root,
                  text: classes.text,
                  active: classes.active,
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <React.Fragment>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            variant="contained"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {buttonCheckout}
        </Box>
      </React.Fragment>
    </Box>
  );
};

type HorizontalLinearStepperProps = BoxProps & {
  steps: any[];
  activeStep: number;
  onNext: () => void;
  onBack: () => void;
  nextProps?: ButtonProps;
  buttonCheckout: ReactNode;
};

export default HorizontalLinearStepper;

const useStyles = makeStyles((theme: ThemeProps) => ({
  labelContainer: {
    color: theme.palette.grey[500],
  },
  text: {},
  active: {},
  root: {
    "&$active": {
      "& $text": {
        fill: "white",
      },
    },
  },
}));
