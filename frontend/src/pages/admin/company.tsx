import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import {
  Alert,
  Box,
  Pagination,
  Snackbar,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { AppTypography } from "components/common";
import { CommonUtils } from "utils";
import SideBarAdmin from "components/common/sn-admin/SideBarAdmin";
import { useRouter } from "next/router";
import { ApiConstant, AppConstant, PathConstant } from "const";
import useVerifyAdmin from "hooks/useVerifyAdmin";
import TableCompany from "components/common/sn-admin/TableCompany";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CompanyActions, CompanySelector } from "redux-store";

const Company: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const handleVerifyAdmin = useVerifyAdmin();
  const dispatch = useDispatch();

  const pagination = useSelector(CompanySelector.getPagination, shallowEqual);

  const [tabValue, setIsTabValue] = useState(TAB_OPTIONS.pending);

  const handleGetCompanyList = (all?: boolean, params?: any) => {
    if (all) {
      dispatch(CompanyActions.getCompanyList({ ...params }));
    } else {
      dispatch(
        CompanyActions.getCompanyList({
          ...params,
          status: AppConstant.STATUS.pending,
        })
      );
    }
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setIsTabValue(newValue);

    handleGetCompanyList(newValue === TAB_OPTIONS.all);
  };

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    handleGetCompanyList(tabValue === TAB_OPTIONS.all, {
      page: value,
    });
  };

  const handleRedirect = async () => {
    const isAdmin = await handleVerifyAdmin();
    if (!isAdmin) {
      router.replace(PathConstant.ROOT);
    }
  };

  useEffect(() => {
    handleRedirect();
    handleGetCompanyList();
  }, []);

  return (
    <>
      <Stack direction="row" pl={37.5} spacing={3}>
        <SideBarAdmin />
        <Stack pt={3} pr={3} spacing={3} flex={1}>
          <AppTypography variant="h3">Company List</AppTypography>
          <Box className="space-between-root">
            <AppTypography color="grey.500">
              Your listings are shown in the table below.
            </AppTypography>
            <Tabs
              value={tabValue}
              onChange={handleChangeTab}
              aria-label="basic tabs example"
            >
              <Tab label="Pending" value={TAB_OPTIONS.pending} />
              <Tab label="All" value={TAB_OPTIONS.all} />
            </Tabs>
          </Box>
          <TableCompany
            onGetCompany={() =>
              handleGetCompanyList(tabValue === TAB_OPTIONS.all)
            }
          />
          <Stack spacing={2} alignItems="center" my={5}>
            <Pagination
              page={pagination?.page || AppConstant.DEFAULT_PAGINATION.page}
              count={pagination?.totalPages || 0}
              shape="rounded"
              onChange={handleChangePage}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Company;

const TAB_OPTIONS = {
  pending: 0,
  all: 1,
};

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    minHeight: "100vh",
    height: "100vh",
  },
}));

export const getServerSideProps = async (context: any) =>
  CommonUtils.handleRedirectUnauthorized(context);
