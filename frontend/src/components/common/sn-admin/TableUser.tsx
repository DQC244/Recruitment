import {
  Alert,
  Avatar,
  Box,
  Button,
  IconButton,
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
import { BlockIcon, UnLockIcon } from "components/icons";
import { ApiConstant, AppConstant } from "const";
import { ThemeProps } from "models/types";
import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { AdminSelector } from "redux-store";
import { AccountService, AdminService, AppService } from "services";
import AppTooltip from "../AppTooltip";
import { ConfirmModal } from "../modal";

const TableUser = ({ onGetUserList }: TableProps) => {
  const classes = useStyles();

  const userList = useSelector(AdminSelector.getUserList, shallowEqual);
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);
  const [selected, setSelected] = useState("");
  const [isOpenMsg, setIsOpenMsg] = useState(false);
  const [error, setError] = useState("");
  const [action, setAction] = useState<number>();

  const deleteUserService = async (id: string) => {
    try {
      const res: any = await AccountService.handleUpdateUser({
        id,
        status: action,
      });
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

  const handleOpenModal = (selector: string, action: number) => {
    setAction(action);

    setSelected(selector);
    setIsOpenActionModal(true);
  };

  const handleDeleteUser = async () => {
    if (!selected) return;

    await deleteUserService(selected);
    onGetUserList();
    setIsOpenActionModal(false);
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.root}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Avatar</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">User Type</TableCell>
              <TableCell align="center" width={300}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList?.listItems?.map((user, index) => (
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
                  {user?.name}
                </TableCell>
                <TableCell align="center">
                  <Avatar src={user?.image} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {user?.phone || "--"}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user?.email || "--"}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color:
                      user?.status === AppConstant.USER_STATUS.active
                        ? "#2ecc71"
                        : "#d32f2f",
                  }}
                >
                  {user?.status === ACTION.block ? "Blocked" : "Active"}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {getLabelUser(user?.permission)}
                </TableCell>
                <TableCell align="center">
                  <AppTooltip
                    title={
                      user?.status === AppConstant.USER_STATUS.active
                        ? "Block User"
                        : "Unlock User"
                    }
                  >
                    <IconButton
                      className={
                        user?.status === AppConstant.USER_STATUS.active
                          ? classes.buttonReject
                          : classes.buttonUnlock
                      }
                      onClick={() =>
                        handleOpenModal(
                          user._id,
                          user?.status === AppConstant.USER_STATUS.active
                            ? ACTION.block
                            : ACTION.unlock
                        )
                      }
                    >
                      {user?.status === AppConstant.USER_STATUS.active ? (
                        <BlockIcon />
                      ) : (
                        <UnLockIcon />
                      )}
                    </IconButton>
                  </AppTooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmModal
        labelCancel="Cancel"
        labelConfirm="Ok"
        onSubmit={handleDeleteUser}
        open={isOpenActionModal}
        onClose={() => setIsOpenActionModal(false)}
        onCancel={() => setIsOpenActionModal(false)}
        onConfirm={handleDeleteUser}
        modalContentProps={{
          content:
            action === AppConstant.USER_STATUS.active
              ? "Are you sure you want to Unlock this User?"
              : "Are you sure you want to Block this User?",
        }}
        modalTitleProps={{
          title: action === AppConstant.USER_STATUS.active ? "Unlock" : "Block",
        }}
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
  onGetUserList: () => void;
};

export default TableUser;

const getLabelUser = (id: number) => {
  if (id === AppConstant.USER_TYPE.candidate) {
    return "Candidate";
  }
  if (id === AppConstant.USER_TYPE.employer) {
    return "Employer";
  }
  return "";
};

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
    fontSize: 26,
    width: 50,
    marginLeft: 8,
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  buttonUnlock: {
    fontSize: 26,
    width: 50,
    marginLeft: 8,
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
  image: {
    width: 100,
    height: 100,
    objectFit: "cover",
    border: `1px solid ${theme.palette.grey[500]}`,
  },
}));

const ACTION = {
  block: 1,
  unlock: 0,
};
