import { Box, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import React from "react";
import AppTypography from "../AppTypography";
import clsx from "clsx";
import { CardPackages } from "../packages";

const ActivePackages = () => {
  const classes = useStyles();
  const isPackages = true;

  return (
    <Stack className={classes.root}>
      <AppTypography variant="h4" className={classes.title}>
        Active Packages
      </AppTypography>
      <Box className={clsx("center-root", classes.wrapper)}>
        {isPackages ? (
          <CardPackages data={DATA} />
        ) : (
          <AppTypography>
            No packages have been bought or all packages have been used.
          </AppTypography>
        )}
      </Box>
    </Stack>
  );
};

export default ActivePackages;

const DATA = {
  name: "Corporate Package",
  description:
    "With the Corporate Job Package you will be able to post up to 10 jobs that will be visible for 60 days.",
  price: 39.99,
  dayPayment: 60,
};

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    boxShadow: "0 0 15px rgb(0 0 0 / 10%)",
    minWidth: 500,
    minHeight: 300,
    maxWidth: "100%",
  },
  wrapper: {
    borderTop: `1px solid ${theme.palette.grey[200]}`,
    flex: 1,
  },
  title: {
    padding: theme.spacing(2, 3),
  },
}));
