import { Box } from "@mui/material";
import { AppTypography } from "components/common";
import { NextPage } from "next";
import React from "react";

const Success: NextPage = () => {
  return (
    <Box height="50vh" className="center-root">
      <AppTypography variant="h4" textAlign="center">
        You have successfully created the job!
      </AppTypography>
    </Box>
  );
};

export default Success;
