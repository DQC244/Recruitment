import React from "react";
import { AppBar, Button, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { ThemeProps } from "models/types";
import HeaderTabs from "./HeaderTabs";
import { AppTypography } from "components/common";
import { useTranslation } from "react-i18next";

const MLHeader = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

  return (
    <AppBar className={classes.appBar}>
      <Container
        classes={{ root: clsx("space-between-root", classes.container) }}
      >
        <AppTypography color="primary.main" variant="h3">
          DQC
        </AppTypography>
        <HeaderTabs />
        <Button variant="contained">{getLabel("lPostJob")}</Button>
      </Container>
    </AppBar>
  );
};

export default MLHeader;
export const HEADER_HEIGHT_IN_PX = 80;

const useStyles = makeStyles((theme: ThemeProps) => ({
  appBar: {
    position: "fixed",
    height: HEADER_HEIGHT_IN_PX,
    backgroundColor: theme.palette.common.white,
  },
  container: {
    height: HEADER_HEIGHT_IN_PX,
  },
}));
