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
import { BannerCompany } from "components/common/sn-company";

const JobsDetail: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const jobId = router.query?.jobId;

  const jobInfo = useSelector(JobSelector.getJobInfo, shallowEqual);
  const companyInfo = useSelector(CompanySelector.getCompanyInfo, shallowEqual);

  const chipList = useMemo(() => {
    if (jobInfo.tag) {
      return jobInfo.tag.split(" ");
    }
    return [];
  }, [jobInfo.tag]);

  useEffect(() => {
    if (jobId) {
      dispatch(JobActions.getJob(jobId));
    }
  }, [jobId]);

  return (
    <Container className={classes.root}>
      <JobPanel data={jobInfo} />
      <Stack direction="row" sx={{ my: 10 }} spacing={3}>
        <Stack flex={1} maxWidth="calc(100% - 300px)" overflow="hidden">
          <BannerCompany data={companyInfo} />
          <Stack mt={2}>
            <Grid container direction="row" spacing={0.5} mb={5}>
              {chipList.map((item, index) => (
                <Grid item key={index}>
                  <Chip label={item} variant="outlined" />
                </Grid>
              ))}
            </Grid>
            <AppTypography variant="h4" color="black">
              Job Description
            </AppTypography>
            <Box
              dangerouslySetInnerHTML={{ __html: jobInfo?.description }}
            ></Box>
          </Stack>
        </Stack>
        <Box width={300}>
          <JobOverview />
        </Box>
      </Stack>
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
