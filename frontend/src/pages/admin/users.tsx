import React, { useEffect, useMemo, useState } from "react";
import { Alert, Box, Button, Pagination, Snackbar, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { AppTypography } from "components/common";
import { NextPage } from "next";
import { CommonUtils } from "utils";
import { useRouter } from "next/router";
import useVerifyAdmin from "hooks/useVerifyAdmin";
import { ApiConstant, AppConstant, PathConstant } from "const";
import SideBarAdmin from "components/common/sn-admin/SideBarAdmin";
import TablePackage from "components/common/sn-admin/TablePackage";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AdminActions, AdminSelector, CompanyActions } from "redux-store";
import { AppService } from "services";
import EditPackageModal from "components/common/sn-admin/EditPackageModal";
import TableUser from "components/common/sn-admin/TableUser";

const Users: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleVerifyAdmin = useVerifyAdmin();
  const pagination = useSelector(AdminSelector.getPagination, shallowEqual);

  const handleRedirect = async () => {
    const isAdmin = await handleVerifyAdmin();
    if (!isAdmin) {
      router.replace(PathConstant.ROOT);
    }
  };

  const handleGetUserList = (param?: any) => {
    dispatch(
      AdminActions.getUserList({
        page: AppConstant.DEFAULT_PAGINATION.page,
        size: AppConstant.DEFAULT_PAGINATION.size,
        ...param,
      })
    );
  };

  useEffect(() => {
    handleRedirect();
    handleGetUserList();
  }, []);

  return (
    <>
      <Stack direction="row" spacing={3} pl={37.5}>
        <SideBarAdmin />
        <Stack pt={3} pr={3} flex={1} spacing={3}>
          <AppTypography variant="h3">Users List</AppTypography>
          <Stack spacing={1}>
            <TableUser onGetUserList={handleGetUserList} />
            <Stack spacing={2} alignItems="center" my={5}>
              <Pagination
                page={pagination?.page || AppConstant.DEFAULT_PAGINATION.page}
                count={pagination?.totalPages || 0}
                shape="rounded"
                onChange={(_, value) => handleGetUserList({ page: value })}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Users;

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
