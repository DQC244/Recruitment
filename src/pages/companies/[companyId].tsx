import React from "react";
import { NextPage } from "next";
import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";

const CompanyDetail: NextPage = () => {
  const classes = useStyles();

  return <Container className={classes.root}>companies detail</Container>;
};

export default CompanyDetail;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
}));
