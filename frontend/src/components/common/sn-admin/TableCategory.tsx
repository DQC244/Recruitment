import {
  Alert,
  Box,
  Button,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ApiConstant } from "const";
import { useHandleUploadFile } from "hooks";
import { ThemeProps } from "models/types";
import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { CompanySelector } from "redux-store";
import { AppService } from "services";
import { ConfirmModal } from "../modal";
import EditCategoryModal from "./EditCategoryModal";

const TableCategory = ({ onGetCategory }: TableProps) => {
  const classes = useStyles();

  const handleUploadFile = useHandleUploadFile();

  const categoryList = useSelector(
    CompanySelector.getCategoryList,
    shallowEqual
  );
  const [category, setCategory] = useState<any>();
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [selected, setSelected] = useState("");
  const [isOpenMsg, setIsOpenMsg] = useState(false);
  const [error, setError] = useState("");

  const updateCategoryService = async (
    id: string,
    data: AppService.CategoryProps
  ) => {
    try {
      const res: any = await AppService.updateCategory(id, data);
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

  const handleEditCategory = async (newData: any) => {
    let url = newData.image;
    if (newData.image instanceof File) {
      url = await handleUploadFile(newData.image);
    }
    updateCategoryService(newData._id, { ...newData, image: url });
    setIsOpenEditModal(false);
    onGetCategory();
  };

  const deleteCategoryService = async (id: string) => {
    try {
      const res: any = await AppService.deleteCategory(id);
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

  const handleOpenEditModal = (selector: string) => {
    setCategory(selector);
    onGetCategory();
    setIsOpenEditModal(true);
  };

  const handleOpenModal = (selector: string) => {
    setSelected(selector);
    setIsOpenActionModal(true);
  };

  const handleDeleteCategory = async () => {
    if (!selected) return;

    await deleteCategoryService(selected);
    onGetCategory();
    setIsOpenActionModal(false);
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.root}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Thumbnail</TableCell>
              <TableCell align="center" width={300}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryList?.map((category, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ textTransform: "capitalize" }}
                >
                  {category.name}
                </TableCell>
                <TableCell align="center">
                  <Box
                    component="img"
                    src={category.image}
                    className={classes.image}
                  />
                </TableCell>
                <TableCell align="center">
                  <Button
                    className={classes.buttonApprove}
                    onClick={() => handleOpenEditModal(category)}
                  >
                    Edit
                  </Button>
                  <Button
                    className={classes.buttonReject}
                    onClick={() => handleOpenModal(category._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmModal
        labelCancel="Cancel"
        labelConfirm="Ok"
        onSubmit={handleDeleteCategory}
        open={isOpenActionModal}
        onClose={() => setIsOpenActionModal(false)}
        onCancel={() => setIsOpenActionModal(false)}
        onConfirm={handleDeleteCategory}
        modalContentProps={{
          content: "Are you sure you want to Delete this category?",
        }}
        modalTitleProps={{
          title: "Delete",
        }}
      />
      <EditCategoryModal
        data={category}
        open={isOpenEditModal}
        onClose={() => setIsOpenEditModal(false)}
        onSubmit={handleEditCategory}
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

type TableProps = {
  onGetCategory: () => void;
};

export default TableCategory;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    boxShadow: "0 0 15px rgb(0 0 0 / 10%)",
    width: "calc(100vw - 348px)",
  },
  buttonApprove: {
    ...theme.typography?.body2,
    width: 50,
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.info.dark,
    },
  },
  buttonReject: {
    ...theme.typography?.body2,
    width: 50,
    marginLeft: 8,
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  image: {
    width: 100,
    height: 100,
    objectFit: "cover",
    border: `1px solid ${theme.palette.grey[500]}`,
  },
}));
