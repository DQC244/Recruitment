import { Button, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { StackProps } from "@mui/system";
import { AppConstant } from "const";
import { ThemeProps } from "models/types";
import React, { useState } from "react";
import AppTypography from "../AppTypography";
import CandidateForm from "./CandidateForm";
import clsx from "clsx";
import EmployerForm from "./EmployerForm";

const RegisterForm = ({ className, ...otherProps }: StackProps) => {
  const classes = useStyles();
  const [userType, setUserType] = useState(AppConstant.USER_TYPE.candidate);

  return (
    <Stack
      className={clsx(classes.root, className)}
      spacing={5}
      {...otherProps}
    >
      <Stack direction="row" spacing={2}>
        <Button
          className={classes.button}
          variant={
            AppConstant.USER_TYPE.candidate === userType
              ? "contained"
              : "outlined"
          }
          onClick={() => setUserType(AppConstant.USER_TYPE.candidate)}
        >
          <AppTypography>Candidate</AppTypography>
          <AppTypography>Register as a Candidate</AppTypography>
        </Button>
        <Button
          className={classes.button}
          variant={
            AppConstant.USER_TYPE.employer === userType
              ? "contained"
              : "outlined"
          }
          onClick={() => setUserType(AppConstant.USER_TYPE.employer)}
        >
          <AppTypography>Employer</AppTypography>
          <AppTypography>Register as an Employer</AppTypography>
        </Button>
      </Stack>
      {userType === AppConstant.USER_TYPE.employer ? (
        <EmployerForm />
      ) : (
        <CandidateForm />
      )}
    </Stack>
  );
};

export default RegisterForm;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    width: 700,
    maxWidth: "100%",
  },
  button: {
    flexDirection: "column",
    flex: 1,
  },
}));
