import React, { useEffect, useMemo, useState } from "react";
import { Alert, Box, Button, Snackbar, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { AppTypography } from "components/common";
import { NextPage } from "next";
import { CommonUtils } from "utils";
import { useRouter } from "next/router";
import useVerifyAdmin from "hooks/useVerifyAdmin";
import { ApiConstant, PathConstant } from "const";
import SideBarAdmin from "components/common/sn-admin/SideBarAdmin";
import TablePackage from "components/common/sn-admin/TablePackage";
import { useDispatch } from "react-redux";
import { CompanyActions } from "redux-store";
import { AppService } from "services";
import EditPackageModal from "components/common/sn-admin/EditPackageModal";

const Package: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleVerifyAdmin = useVerifyAdmin();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenMsg, setIsOpenMsg] = useState(false);
  const [error, setError] = useState("");

  const handleRedirect = async () => {
    const isAdmin = await handleVerifyAdmin();
    if (!isAdmin) {
      router.replace(PathConstant.ROOT);
    }
  };

  const handleGetPackage = () => {
    dispatch(CompanyActions.getPackageList());
  };

  const handleAddPackageService = async (data: any) => {
    try {
      const res: any = await AppService.createPackage(data);
      if (res.status === ApiConstant.STT_OK) {
        setError("");
      } else {
        setError(res.data.message || "Something went wrong");
      }
      setIsOpenMsg(true);
    } catch (error) {
      setError("Something went wrong");
      setIsOpenMsg(true);
    }
  };

  const handleAddCategory = async (newData: any) => {
    await handleAddPackageService({ ...newData });
    setIsOpenModal(false);
    handleGetPackage();
  };

  useEffect(() => {
    handleRedirect();
    handleGetPackage();
  }, []);

  return (
    <>
      <Stack direction="row" spacing={3} pl={37.5}>
        <SideBarAdmin />
        <Stack pt={3} pr={3} flex={1} spacing={3}>
          <Box className="space-between-root">
            <AppTypography variant="h3">Package List</AppTypography>
            <Button onClick={() => setIsOpenModal(true)} variant="contained">
              Create
            </Button>
          </Box>
          <Stack spacing={1}>
            <TablePackage onGetPackage={handleGetPackage} />
          </Stack>
        </Stack>
      </Stack>
      <EditPackageModal
        open={isOpenModal}
        modalTitleProps={{
          title: "Create new category",
        }}
        onClose={() => setIsOpenModal(false)}
        onSubmit={handleAddCategory}
        label="Create"
      />
      <Snackbar
        open={isOpenMsg}
        autoHideDuration={5000}
        onClose={() => setIsOpenMsg(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setIsOpenMsg(false)}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error || "success!"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Package;

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
