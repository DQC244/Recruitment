import React, { useEffect, useMemo } from "react";
import { NextPage } from "next";
import { Box, Chip, Container, Grid, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { JobPanel, JobOverview } from "components/common/sn-job-detail";
import { AppTypography } from "components/common";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CompanySelector, JobActions, JobSelector } from "redux-store";
import JobDetailPanel from "components/common/sn-job-detail/JobDetailPanel";

const JobsDetail: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const jobId = router.query?.jobId;

  const jobInfo = useSelector(JobSelector.getJobInfo, shallowEqual);
  const companyInfo = useSelector(CompanySelector.getCompanyInfo, shallowEqual);

  useEffect(() => {
    if (jobId) {
      dispatch(JobActions.getJob(jobId));
    }
  }, [jobId]);

  return (
    <Container className={classes.root}>
      <JobDetailPanel jobInfo={jobInfo} companyInfo={companyInfo} />
    </Container>
  );
};

export default JobsDetail;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    paddingTop: 24,
  },
  form: {
    margin: "100px auto",
  },
}));
