import { Button, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { StackProps } from "@mui/system";
import { AppConstant } from "const";
import { ThemeProps } from "models/types";
import React, { useState } from "react";
import AppTypography from "../AppTypography";
import clsx from "clsx";
import EmployerForm from "./EmployerForm";

const RegisterForm = ({ className, ...otherProps }: StackProps) => {
  const classes = useStyles();

  return (
    <Stack
      className={clsx(classes.root, className)}
      spacing={5}
      {...otherProps}
    >
      <EmployerForm />
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
