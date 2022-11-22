import React from "react";
import { NextPage } from "next";
import { Box, Button, Container, Stack } from "@mui/material";
import { SideBar } from "components/common/sn-dashboard";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { AppTypography } from "components/common";
import { TableJob } from "components/common/sn-job-dashboard";

const MyJobs: NextPage = () => {
  const classes = useStyles();

  return (
    <Stack direction="row" pl={37.5} spacing={3}>
      <SideBar />
      <Stack pt={3} pr={3} spacing={3}>
        <AppTypography variant="h3">Job Dashboard</AppTypography>
        <Box className="space-between-root">
          <AppTypography color="grey.500">
            Your listings are shown in the table below.
          </AppTypography>
          <Button variant="contained">ADD JOB</Button>
        </Box>
        <TableJob />
      </Stack>
    </Stack>
  );
};

export default MyJobs;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    minHeight: "100vh",
    height: "100vh",
  },
}));
