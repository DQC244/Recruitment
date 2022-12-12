import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";
import { ThemeProps } from "models/types";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { JobSelector } from "redux-store";
import { getColorStatus, getStatusLabel } from "../helper";

const TableJob = () => {
  const classes = useStyles();

  const jobList = useSelector(JobSelector.getJobList, shallowEqual);

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Date Posted</TableCell>
            <TableCell align="right">Closing Date</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobList?.listItems?.map((job, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
}));
