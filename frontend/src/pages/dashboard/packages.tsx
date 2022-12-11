import React from "react";
import { NextPage } from "next";
import { Stack } from "@mui/material";
import { ActivePackages, SideBar } from "components/common/sn-dashboard";
import { AppTypography } from "components/common";
import { CommonUtils } from "utils";

const Packages: NextPage = () => {
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

export const getServerSideProps = async (context: any) =>
  CommonUtils.handleRedirectUnauthorized(context);
