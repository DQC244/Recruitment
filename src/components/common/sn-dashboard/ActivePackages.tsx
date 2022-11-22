import { Box, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import React from "react";
import AppTypography from "../AppTypography";
import clsx from "clsx";

const ActivePackages = () => {
  const classes = useStyles();

  return (
    <Stack className={classes.root}>
      <AppTypography variant="h4" className={classes.title}>
        Active Packages
      </AppTypography>
      <Box className={clsx("center-root", classes.wrapper)}>
        <AppTypography>
          No packages have been bought or all packages have been used.
        </AppTypography>
      </Box>
    </Stack>
  );
};

export default ActivePackages;

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
