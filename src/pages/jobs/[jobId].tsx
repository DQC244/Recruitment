import React from "react";
import { NextPage } from "next";
import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";

const JobsDetail: NextPage = () => {
  const classes = useStyles();

  return <Container className={classes.root}>job detail</Container>;
};

export default JobsDetail;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  form: {
    margin: "100px auto",
  },
}));
