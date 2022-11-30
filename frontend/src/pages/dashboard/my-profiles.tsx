import React from "react";
import { NextPage } from "next";
import { Box, Stack } from "@mui/material";
import { SideBar } from "components/common/sn-dashboard";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { AppTypography } from "components/common";
import { ProfilePanel } from "components/common/sn-profile-dashboard";

const MyProfiles: NextPage = () => {
  const classes = useStyles();

  return (
    <Stack direction="row" pl={37.5} spacing={3}>
      <SideBar />
      <Stack pt={3} pr={3} spacing={3} flex={1}>
        <AppTypography variant="h3">My Profiles</AppTypography>
        <Box className="space-between-root">
          <ProfilePanel />
        </Box>
      </Stack>
    </Stack>
  );
};

export default MyProfiles;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    minHeight: "100vh",
    height: "100vh",
  },
}));
