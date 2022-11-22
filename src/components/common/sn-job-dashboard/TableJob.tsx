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
import { ThemeProps } from "models/types";
import React from "react";
import { DateUtils } from "utils";

const TableJob = () => {
  const classes = useStyles();

  const createData = (
    title: string,
    filled: number,
    datePosted: number,
    closeDate: number,
    listingExpires: number,
    status: string
  ) => {
    const { date: newDatePosted } =
      DateUtils.covertTimeStampToDateFormat(datePosted);
    const { date: newCloseDate } =
      DateUtils.covertTimeStampToDateFormat(closeDate);
    const { date: newListingExpires } =
      DateUtils.covertTimeStampToDateFormat(listingExpires);

    return {
      title,
      filled,
      datePosted: newDatePosted,
      closeDate: newCloseDate,
      listingExpires: newListingExpires,
      status,
    };
  };

  const rows = [
    createData(
      "Account Manager",
      4,
      1669101851,
      1700637851,
      1700637851,
      "pending"
    ),
    createData(
      "Ice cream sandwich",
      5,
      1669101851,
      1700637851,
      1700637851,
      "pending"
    ),
    createData("Eclair", 4, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Cupcake", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 3, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
    createData("Gingerbread", 5, 1669101851, 1700637851, 1700637851, "pending"),
  ];

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Filled</TableCell>
            <TableCell align="right">Date Posted</TableCell>
            <TableCell align="right">Closing Date</TableCell>
            <TableCell align="right">Listing Expires</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.filled}</TableCell>
              <TableCell align="right">{row.datePosted}</TableCell>
              <TableCell align="right">{row.closeDate}</TableCell>
              <TableCell align="right">{row.listingExpires}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
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
