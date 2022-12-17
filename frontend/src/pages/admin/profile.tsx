import React, { useEffect } from "react";
import { NextPage } from "next";
import { Box, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { AppTypography } from "components/common";
import { ProfilePanel } from "components/common/sn-profile-dashboard";
import { CommonUtils } from "utils";
import SideBarAdmin from "components/common/sn-admin/SideBarAdmin";
import useVerifyAdmin from "hooks/useVerifyAdmin";
import { useRouter } from "next/router";
import { PathConstant } from "const";

const Profiles: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const handleVerifyAdmin = useVerifyAdmin();

  const handleRedirect = async () => {
    const isAdmin = await handleVerifyAdmin();
    if (!isAdmin) {
      router.replace(PathConstant.ROOT);
    }
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  return (
    <Stack direction="row" pl={37.5} spacing={3}>
      <SideBarAdmin />
      <Stack pt={3} pr={3} spacing={3} flex={1}>
        <AppTypography variant="h3">My Profiles</AppTypography>
        <Box className="space-between-root">
          <ProfilePanel />
        </Box>
      </Stack>
    </Stack>
  );
};

export default Profiles;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    minHeight: "100vh",
    height: "100vh",
  },
}));

export const getServerSideProps = async (context: any) =>
  CommonUtils.handleRedirectUnauthorized(context);
