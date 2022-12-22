import { Box } from "@mui/material";
import { AppTypography } from "components/common";
import { NextPage } from "next";
import React from "react";

const Success: NextPage = () => {
  return (
    <Box height="50vh" className="center-root">
      <AppTypography variant="h4" textAlign="center">
        Your company has been submitted successfully and is pending approval.
      </AppTypography>
    </Box>
  );
};

export default Success;
