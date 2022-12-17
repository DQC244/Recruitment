import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import {
  Alert,
  Box,
  Button,
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
import { ApiConstant, PathConstant } from "const";
import useVerifyAdmin from "hooks/useVerifyAdmin";
import { useDispatch } from "react-redux";
import { CompanyActions } from "redux-store";
import { AppService } from "services";
import TableCategory from "components/common/sn-admin/TableCategory";
import EditCategoryModal from "components/common/sn-admin/EditCategoryModal";
import { useHandleUploadFile } from "hooks";

const Category: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const handleVerifyAdmin = useVerifyAdmin();
  const dispatch = useDispatch();

  const handleUploadFile = useHandleUploadFile();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenMsg, setIsOpenMsg] = useState(false);
  const [error, setError] = useState("");

  const handleRedirect = async () => {
    const isAdmin = await handleVerifyAdmin();
    if (!isAdmin) {
      router.replace(PathConstant.ROOT);
    }
  };

  const handleGetCategory = (params?: any) => {
    dispatch(CompanyActions.getCategoryList({ ...params }));
  };

  const handleAddCategoryService = async (data: any) => {
    try {
      const res: any = await AppService.createCategory(data);
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
    let url = newData.image;
    if (newData.image instanceof File) {
      url = await handleUploadFile(newData.image);
    }

    await handleAddCategoryService({ ...newData, image: url });
    setIsOpenModal(false);
    handleGetCategory();
  };

  useEffect(() => {
    handleRedirect();
    handleGetCategory();
  }, []);

  return (
    <>
      <Stack direction="row" pl={37.5} spacing={3}>
        <SideBarAdmin />
        <Stack pt={3} pr={3} spacing={3} flex={1}>
          <Box className="space-between-root">
            <AppTypography variant="h3">Category List</AppTypography>
            <Button variant="contained" onClick={() => setIsOpenModal(true)}>
              Create New
            </Button>
          </Box>
          <TableCategory onGetCategory={handleGetCategory} />
        </Stack>
      </Stack>
      <EditCategoryModal
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

export default Category;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    minHeight: "100vh",
    height: "100vh",
  },
}));

export const getServerSideProps = async (context: any) =>
  CommonUtils.handleRedirectUnauthorized(context);
