import React, { useEffect, useMemo } from "react";
import { Stack } from "@mui/material";
import { ActivePackages, SideBar } from "components/common/sn-dashboard";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { AppTypography } from "components/common";
import { useAuthContext } from "context";
import { NextPage } from "next";
import { CommonUtils } from "utils";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CompanyActions, CompanySelector } from "redux-store";
import { useRouter } from "next/router";
import useVerifyAdmin from "hooks/useVerifyAdmin";
import { PathConstant } from "const";

const DashboardAdmin: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleVerifyAdmin = useVerifyAdmin();
  const { accountInfo } = useAuthContext();

  const handleRedirect = async () => {
    const isAdmin = await handleVerifyAdmin();
    if (!isAdmin) {
      router.replace(PathConstant.ROOT);
    }
  };

  useEffect(() => {
    dispatch(CompanyActions.getPackageList());
    handleRedirect();
  }, []);

  return (
    <Stack direction="row" spacing={3} pl={37.5}>
      <SideBar />
      <Stack pt={3} pr={3} flex={1} spacing={3}>
        <AppTypography variant="h3">{`Welcome, ${accountInfo.email}`}</AppTypography>
      </Stack>
    </Stack>
  );
};

export default DashboardAdmin;

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

export const getServerSideProps = async (context: any) =>
  CommonUtils.handleRedirectUnauthorized(context);
