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
import { Router, useRouter } from "next/router";
import { AppConstant, PathConstant } from "const";

const Dashboard: NextPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const packageList = useSelector(CompanySelector.getPackageList, shallowEqual);
  const { accountInfo } = useAuthContext();

  console.log(accountInfo);

  const userPackage = useMemo(() => {
    let packageDetail;
    if (packageList.length) {
      packageDetail = packageList.filter(
        (item) => item._id === accountInfo.package
      )[0];
    }
    return packageDetail;
  }, [packageList]);

  useEffect(() => {
    dispatch(CompanyActions.getPackageList());
  }, []);

  useEffect(() => {
    if (accountInfo.permission === AppConstant.USER_TYPE.candidate) {
      router.push(PathConstant.PROFILES_DASHBOARD);
    } else if (accountInfo.permission === AppConstant.USER_TYPE.admin) {
      router.push(PathConstant.ADMIN);
    }
  }, [accountInfo]);

  return (
    <Stack direction="row" spacing={3} pl={37.5}>
      <SideBar />
      <Stack pt={3} pr={3} flex={1} spacing={3}>
        <AppTypography variant="h3">{`Welcome, ${accountInfo.name}`}</AppTypography>
        <ActivePackages data={userPackage} />
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

export const getServerSideProps = async (context: any) =>
  CommonUtils.handleRedirectUnauthorized(context);
