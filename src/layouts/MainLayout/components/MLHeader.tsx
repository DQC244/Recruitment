import React from "react";
import { AppBar, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

const MLHeader = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Container classes={{ root: clsx("center-vertical-root", classes.container) }}>
        React App Header
      </Container>
    </AppBar>
  );
};

export default MLHeader;
export const HEADER_HEIGHT_IN_PX = 80;

const useStyles = makeStyles(() => ({
  appBar: {
    position: "fixed",
    height: HEADER_HEIGHT_IN_PX,
  },
  container: {
    height: HEADER_HEIGHT_IN_PX,
  },
}));
