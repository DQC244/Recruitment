import React from "react";
import { NextPage } from "next";
import { Container } from "@mui/material";
import { RegisterForm } from "components/common/sn-register";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";

const Register: NextPage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <RegisterForm className={classes.form} />
    </Container>
  );
};

export default Register;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  form: {
    margin: "100px auto",
  },
}));
