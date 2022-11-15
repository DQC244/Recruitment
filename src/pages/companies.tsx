import React from "react";
import { NextPage } from "next";
import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";

const Companies: NextPage = () => {
  const classes = useStyles();

  return <Container className={classes.root}>companies</Container>;
};

export default Companies;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
}));
