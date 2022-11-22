import React from "react";
import { NextPage } from "next";
import { Box, Container, Stack } from "@mui/material";
import { SideBar } from "components/common/sn-dashboard";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";

const MyCompany: NextPage = () => {
  const classes = useStyles();

  return (
    <Stack direction="row" pl={37.5} spacing={3}>
      <SideBar />
      <Box>My Company</Box>
    </Stack>
  );
};

export default MyCompany;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    minHeight: "100vh",
    height: "100vh",
  },
}));
