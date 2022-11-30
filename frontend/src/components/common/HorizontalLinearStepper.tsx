import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";

const HorizontalLinearStepper = ({
  steps,
  onNext,
  onBack,
}: HorizontalLinearStepperProps) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    onBack();
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) return;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    onNext();
  };

  return (
    <Box sx={{ width: "100%" }}>
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
          <Button variant="contained" onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </React.Fragment>
    </Box>
  );
};

type HorizontalLinearStepperProps = {
  steps: any[];
  onNext: () => void;
  onBack: () => void;
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
