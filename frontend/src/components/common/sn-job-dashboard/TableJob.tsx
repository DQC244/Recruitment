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
import dayjs from "dayjs";
import { ThemeProps } from "models/types";
import { useRouter } from "next/router";
import React, { MouseEvent, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { JobActions, JobSelector } from "redux-store";
import { AppService } from "services";
import { getColorStatus, getStatusLabel } from "../helper";
import { ConfirmModal } from "../modal";

const TableJob = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const jobList = useSelector(JobSelector.getJobList, shallowEqual);
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false);
  const [idSelected, setIdSelected] = useState<string>();
  const [isOpenMsg, setIsOpenMsg] = useState(false);
  const [error, setError] = useState("");

  const handleRedirectJobDetail = (id?: string) => {
    router.push(`${PathConstant.JOBS}/${id}`);
  };

  const handleDeleteService = async (id: string) => {
    try {
      const res: any = await AppService.deleteJob(id);
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
    id?: string
  ) => {
    event.stopPropagation();
    setIdSelected(id);
    setIsOpenRejectModal(true);
  };

  const handleRejectJob = async () => {
    if (!idSelected) return;
    await handleDeleteService(idSelected);
    dispatch(JobActions.getMyJobList());
    setIsOpenRejectModal(false);
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.root}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                Title {`(${jobList?.pagination?.totalItems || "--"})`}
              </TableCell>
              <TableCell align="right">Date Posted</TableCell>
              <TableCell align="right">Closing Date</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobList?.listItems?.map((job, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                  "&:hover": {
                    background: "#D9D9D9",
                  },
                }}
                onClick={() => handleRedirectJobDetail(job._id)}
              >
                <TableCell component="th" scope="row">
                  {job.title}
                </TableCell>
                <TableCell align="right">
                  {dayjs(job.updatedAt).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell align="right">
                  {dayjs(job.updatedAt).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell
                  sx={{ color: getColorStatus(job.status) }}
                  align="right"
                >
                  {getStatusLabel(job.status)}
                </TableCell>
                <TableCell align="right">
                  <Button
                    className={classes.buttonReject}
                    onClick={(e) => handleOpenModal(e, job._id)}
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
        onSubmit={handleRejectJob}
        open={isOpenRejectModal}
        onClose={() => setIsOpenRejectModal(false)}
        onCancel={() => setIsOpenRejectModal(false)}
        onConfirm={handleRejectJob}
        modalContentProps={{
          content: "Are you sure you want to reject this job?",
        }}
        modalTitleProps={{
          title: "Reject",
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

export default TableJob;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    boxShadow: "0 0 15px rgb(0 0 0 / 10%)",
    width: "calc(100vw - 348px)",
    height: "calc(100vh - 250px)",
  },
  buttonReject: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));
