import React, { useEffect } from "react";
import {
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { AppLink, AppTypography } from "components/common";
import { NextPage } from "next";
import { CommonUtils } from "utils";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { JobActions, JobSelector } from "redux-store";
import { useRouter } from "next/router";
import dayjs from "dayjs";

const ApplicationList: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const jobId = router.query?.jobId;
  const applicationList = useSelector(JobSelector.getApplication, shallowEqual);
  const jobDetail = useSelector(JobSelector.getJobInfo, shallowEqual);

  useEffect(() => {
    dispatch(JobActions.getMyApplication({ jobId }));
    dispatch(JobActions.getJob(jobId));
  }, [jobId]);

  return (
    <Container>
      <Stack mt={5} spacing={5}>
        <Button
          variant="contained"
          sx={{ width: 150 }}
          onClick={() => {
            router.back();
          }}
        >
          Back
        </Button>
        <AppTypography variant="h3">
          Applications for
          <AppTypography
            component="span"
            color="primary.main"
            variant="h3"
          >{` ${jobDetail.title}`}</AppTypography>
        </AppTypography>
        <TableContainer component={Paper} className={classes.root}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell width="20%">Full Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left" width="30%">
                  Content
                </TableCell>
                <TableCell align="left">Link CV</TableCell>
                <TableCell align="left">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applicationList?.map((application, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {application.name}
                  </TableCell>
                  <TableCell align="left">
                    <AppLink href={`mailto:${application.email}`}>
                      <AppTypography>{application.email}</AppTypography>
                    </AppLink>
                  </TableCell>
                  <TableCell align="left">{application.message}</TableCell>
                  <TableCell align="left">
                    <a href={application.cvUrl || "#"} target="_blank">
                      View CV
                    </a>
                  </TableCell>
                  <TableCell align="left">
                    {dayjs(application.createdAt).format("DD/MM/YYYY")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
};

export default ApplicationList;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {},
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
