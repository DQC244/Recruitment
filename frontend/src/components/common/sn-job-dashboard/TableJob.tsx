import {
  Alert,
  Button,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { UnHiddenIcon, HiddenIcon, DeleteIcon } from "components/icons";
import { ApiConstant, AppConstant, PathConstant } from "const";
import dayjs from "dayjs";
import { ThemeProps } from "models/types";
import { useRouter } from "next/router";
import React, { MouseEvent, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { JobActions, JobSelector } from "redux-store";
import { AppService } from "services";
import { getColorStatus, getStatusLabel, getStatusLabelJob } from "../helper";
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
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);
  const [action, setAction] = useState<number>();

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

  const handleOpenActionModal = (
    event: MouseEvent<HTMLButtonElement>,
    id?: string,
    action?: number
  ) => {
    event.stopPropagation();
    setIdSelected(id);
    setAction(action);
    setIsOpenActionModal(true);
  };

  const handleRejectJob = async () => {
    if (!idSelected) return;
    await handleDeleteService(idSelected);
    dispatch(JobActions.getMyJobList());
    setIsOpenRejectModal(false);
  };

  const handleUpdateJobService = async (id: any, status?: number) => {
    try {
      const res: any = await AppService.updateJob(id, status);
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

  const handleUpdateJob = async () => {
    if (!idSelected) return;
    await handleUpdateJobService(idSelected, action);
    dispatch(JobActions.getMyJobList());
    setIsOpenActionModal(false);
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
              <TableCell align="center">Closing Date</TableCell>
              <TableCell align="center">Application</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
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
                <TableCell align="center">{job.closeDate.toString()}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(
                        `${PathConstant.APPLICATION_LIST}/${job._id}`
                      );
                    }}
                    sx={{
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    {job?.application}
                  </IconButton>
                </TableCell>
                <TableCell sx={{ color: "info.main" }} align="center">
                  {getStatusLabelJob(job.status)}
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} width="100%">
                    <IconButton
                      className={classes.buttonReject}
                      onClick={(e) => handleOpenModal(e, job._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      className={classes.action}
                      onClick={(e) =>
                        handleOpenActionModal(
                          e,
                          job._id,
                          job.status === AppConstant.JOB_STATUS.hidden
                            ? AppConstant.JOB_STATUS.show
                            : AppConstant.JOB_STATUS.hidden
                        )
                      }
                    >
                      {job.status === AppConstant.JOB_STATUS.hidden ? (
                        <UnHiddenIcon />
                      ) : (
                        <HiddenIcon />
                      )}
                    </IconButton>
                  </Stack>
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
          content: "Are you sure you want to delete this job?",
        }}
        modalTitleProps={{
          title: "Delete",
        }}
      />
      <ConfirmModal
        labelCancel="Cancel"
        labelConfirm="Ok"
        open={isOpenActionModal}
        onClose={() => setIsOpenActionModal(false)}
        onCancel={() => setIsOpenActionModal(false)}
        onConfirm={handleUpdateJob}
        modalContentProps={{
          content:
            action === AppConstant.USER_STATUS.active
              ? "Are you sure you want to Hidden this Job?"
              : "Are you sure you want to Show this Job?",
        }}
        modalTitleProps={{
          title:
            action === AppConstant.USER_STATUS.active
              ? "Hidden Job"
              : "Show Job",
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
    height: 40,
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  action: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.info.dark,
    },
  },
}));
