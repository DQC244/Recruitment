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
import { ThemeProps } from "models/types";
import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { CompanySelector } from "redux-store";
import { AppService } from "services";
import { ConfirmModal } from "../modal";
import EditPackageModal from "./EditPackageModal";

const TablePackage = ({ onGetPackage }: TableProps) => {
  const classes = useStyles();

  const packageList = useSelector(CompanySelector.getPackageList);
  const [packageData, setPackageData] = useState<any>();
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [selected, setSelected] = useState("");
  const [isOpenMsg, setIsOpenMsg] = useState(false);
  const [error, setError] = useState("");

  const updateCategoryPackage = async (
    id: string,
    data: AppService.CategoryProps
  ) => {
    try {
      const res: any = await AppService.updatePackage(id, data);
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

  const handleEditPackage = async (newData: any) => {
    await updateCategoryPackage(newData._id, { ...newData });
    setIsOpenEditModal(false);
    onGetPackage();
  };

  const deletePackageService = async (id: string) => {
    try {
      const res: any = await AppService.deletePackage(id);
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

  const handleOpenEditModal = (selector: any) => {
    setPackageData(selector);
    setIsOpenEditModal(true);
  };

  const handleOpenModal = (selector: string) => {
    setSelected(selector);
    setIsOpenActionModal(true);
  };

  const handleDeletePackage = async () => {
    if (!selected) return;

    await deletePackageService(selected);
    onGetPackage();
    setIsOpenActionModal(false);
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.root}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Expire(day)</TableCell>
              <TableCell align="center" width={300}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packageList?.map((packageItem, index) => (
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
                  {packageItem.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {packageItem.description}
                </TableCell>
                <TableCell component="th" scope="row">
                  {packageItem.price}
                </TableCell>
                <TableCell align="center">{packageItem.expireDay}</TableCell>
                <TableCell align="center">
                  <Button
                    className={classes.buttonApprove}
                    onClick={() => handleOpenEditModal(packageItem)}
                  >
                    Edit
                  </Button>
                  <Button
                    className={classes.buttonReject}
                    onClick={() => handleOpenModal(packageItem._id)}
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
        onSubmit={handleDeletePackage}
        open={isOpenActionModal}
        onClose={() => setIsOpenActionModal(false)}
        onCancel={() => setIsOpenActionModal(false)}
        onConfirm={handleDeletePackage}
        modalContentProps={{
          content: "Are you sure you want to Delete this package?",
        }}
        modalTitleProps={{
          title: "Delete",
        }}
      />
      <EditPackageModal
        data={packageData}
        open={isOpenEditModal}
        onClose={() => setIsOpenEditModal(false)}
        onSubmit={handleEditPackage}
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
  onGetPackage: () => void;
};

export default TablePackage;

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
}));
