import {
  Alert,
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
import { ApiConstant, AppConstant, PathConstant } from "const";
import { STATUS } from "const/app.const";
import dayjs from "dayjs";
import { ThemeProps } from "models/types";
import { useRouter } from "next/router";
import React, { MouseEvent, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { CompanySelector } from "redux-store";
import { AppService } from "services";
import AppTypography from "../AppTypography";
import { getColorStatus, getStatusLabel } from "../helper";
import { ConfirmModal } from "../modal";
import clsx from "clsx"

const TableCompany = ({ onGetCompany }: TableProps) => {
  const classes = useStyles();
  const router = useRouter();

  const companyList = useSelector(CompanySelector.getCompanyList, shallowEqual);
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);
  const [selected, setSelected] = useState<{ type: number; id: string }>();
  const [isOpenMsg, setIsOpenMsg] = useState(false);
  const [error, setError] = useState("");

  const handleRedirectJobDetail = (id?: string) => {
    router.push(`${PathConstant.COMPANY}/${id}`);
  };

  const approveCompanyService = async (id: string, status: number) => {
    try {
      const res: any = await AppService.approveCompany(id, { status });
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

  const handleOpenModal = (
    event: MouseEvent<HTMLButtonElement>,
    selector: {
      type: number;
      id: string;
    }
  ) => {
    event.stopPropagation();
    setSelected(selector);
    setIsOpenActionModal(true);
  };

  const handleApproveCompany = async () => {
    if (!selected?.id) return;

    const action =
      selected.type === ACTION_TYPE.approve
        ? AppConstant.STATUS.published
        : AppConstant.STATUS.reject;

    await approveCompanyService(selected.id, action);
    onGetCompany();
    setIsOpenActionModal(false);
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.root}>
        <Table sx={{ minWidth: 650, height: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                Name {`(${companyList?.pagination?.totalItems || "--"})`}
              </TableCell>
              <TableCell align="center">Date Posted</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center" width={300}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companyList?.listItems?.length ? (
              companyList?.listItems?.map((company, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                    "&:hover": {
                      background: "#D9D9D9",
                    },
                  }}
                  onClick={() => handleRedirectJobDetail(company._id)}
                >
                  <TableCell component="th" scope="row">
                    {company.name}
                  </TableCell>
                  <TableCell align="center">
                    {dayjs(company.createdAt).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell
                    sx={{ color: getColorStatus(company.status) }}
                    align="center"
                  >
                    {getStatusLabel(company.status)}
                  </TableCell>
                  <TableCell align="center">
                    <>
                      <Button
                        className={clsx(classes.buttonApprove, classes.disable)}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (company.status === STATUS.published) return;
                          handleOpenModal(e, {
                            type: ACTION_TYPE.approve,
                            id: company._id,
                          });
                        }}
                      >
                        Approve
                      </Button>
                      <Button
                        className={classes.buttonReject}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (company.status === STATUS.expired) return;
                          handleOpenModal(e, {
                            type: ACTION_TYPE.reject,
                            id: company._id,
                          });
                        }}
                      >
                        Reject
                      </Button>
                    </>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  height: "100%",
                  "&:hover": {
                    background: "#D9D9D9",
                  },
                }}
              >
                <TableCell colSpan={4} align="center">
                  Company Not Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmModal
        labelCancel="Cancel"
        labelConfirm="Ok"
        onSubmit={handleApproveCompany}
        open={isOpenActionModal}
        onClose={() => setIsOpenActionModal(false)}
        onCancel={() => setIsOpenActionModal(false)}
        onConfirm={handleApproveCompany}
        modalContentProps={{
          content:
            selected?.type === ACTION_TYPE.approve
              ? "Are you sure you want to approve this company?"
              : "Are you sure you want to reject this company?",
        }}
        modalTitleProps={{
          title: selected?.type === ACTION_TYPE.approve ? "Approve" : "Reject",
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
  onGetCompany: () => void;
};

export default TableCompany;

const ACTION_TYPE = {
  reject: 0,
  approve: 1,
};

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    boxShadow: "0 0 15px rgb(0 0 0 / 10%)",
    width: "calc(100vw - 348px)",
    height: "calc(100vh - 320px)",
  },
  buttonApprove: {
    ...theme.typography?.body2,
    width: 50,
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
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
  disable:{
    color:"#c1c1c1"
  }
}));
