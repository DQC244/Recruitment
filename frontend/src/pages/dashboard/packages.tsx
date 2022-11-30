import React from "react";
import { NextPage } from "next";
import { Box, Container, Stack } from "@mui/material";
import { ActivePackages, SideBar } from "components/common/sn-dashboard";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { CardPackages } from "components/common/packages";
import { AppTypography } from "components/common";

const Packages: NextPage = () => {
  const classes = useStyles();

  return (
    <Stack direction="row" pl={37.5} spacing={3}>
      <SideBar />
      <Stack flex={1} pr={3} pt={3} spacing={4}>
        <AppTypography variant="h3">My Packages</AppTypography>
        <ActivePackages />
      </Stack>
    </Stack>
  );
};

export default Packages;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    minHeight: "100vh",
    height: "100vh",
  },
}));
