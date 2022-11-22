import React from "react";
import { NextPage } from "next";
import { Box, Container, Stack } from "@mui/material";
import { ActivePackages, SideBar } from "components/common/sn-dashboard";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { AppTypography } from "components/common";
import clsx from "clsx";

const Dashboard: NextPage = () => {
  const classes = useStyles();
  const email = "chien@gmail.com";
  const publishedTotal = 0;
  const pendingTotal = 1;
  const expiredTotal = 1;

  return (
    <Stack direction="row" spacing={3} pl={37.5}>
      <SideBar />
      <Stack pt={3} pr={3} flex={1} spacing={3}>
        <AppTypography variant="h3">{`Welcome, ${email}`}</AppTypography>
        <Box className="space-around-root">
          <Box className={clsx("center-root", classes.box)}>
            <AppTypography color="common.white" variant="h1">
              {publishedTotal}
            </AppTypography>
            <AppTypography variant="h5" color="common.white">
              Published Listings
            </AppTypography>
          </Box>
          <Box className={clsx("center-root", classes.box, classes.pendingBox)}>
            <AppTypography color="common.white" variant="h1">
              {pendingTotal}
            </AppTypography>
            <AppTypography variant="h5" color="common.white">
              Pending Listings
            </AppTypography>
          </Box>
          <Box className={clsx("center-root", classes.box, classes.expiredBox)}>
            <AppTypography color="common.white" variant="h1">
              {expiredTotal}
            </AppTypography>
            <AppTypography variant="h5" color="common.white">
              Expired Listings
            </AppTypography>
          </Box>
        </Box>
        <ActivePackages />
      </Stack>
    </Stack>
  );
};

export default Dashboard;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    minHeight: "100vh",
    height: "100vh",
  },
  box: {
    height: 200,
    width: 200,
    flexDirection: "column",
    borderRadius: 4,
    background: theme.palette.primary.main,
  },
  pendingBox: {
    background: "#CAA2F5",
  },
  expiredBox: {
    background: "#d04747",
  },
}));
