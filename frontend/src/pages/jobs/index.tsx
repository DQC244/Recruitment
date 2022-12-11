import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Box, Container, Pagination, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { FilterJob, JobCard } from "components/common/sn-jobs";
import { AppTypography } from "components/common";
import { useDispatch, useSelector } from "react-redux";
import { JobActions, JobSelector } from "redux-store";
import { AppConstant, ImageConstant } from "const";
import { HEADER_HEIGHT_IN_PX } from "layouts/MainLayout/components/MLHeader";

const Jobs: NextPage = () => {
  const classes = useStyles();
  const queryParams = useSelector(JobSelector.getQueryParams);
  const jobList = useSelector(JobSelector.getJobList);
  const pagination = useSelector(JobSelector.getPagination);

  const dispatch = useDispatch();

  const handleGetJobList = (page: number) => {
    const newQueryParams = {
      ...queryParams,
      page,
    };

    dispatch(JobActions.getJobList(newQueryParams));
  };

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    handleGetJobList(value);
  };

  useEffect(() => {
    if (!queryParams) return;

    dispatch(
      JobActions.getJobList({
        ...queryParams,
      })
    );
  }, [queryParams]);

  return (
    <Container className={classes.root}>
      <FilterJob />
      <Box width="100%" ml={4}>
        <AppTypography variant="h3" sx={{ py: 2 }}>
          Job List
        </AppTypography>
        {jobList?.listItems?.length ? (
          <Stack className={classes.jobContainer}>
            {jobList?.listItems?.map((item, index) => (
              <JobCard key={index} data={item} />
            ))}
          </Stack>
        ) : (
          <Stack className="center-root">
            <Box
              component="img"
              sx={{ width: 80, height: 80 }}
              src={ImageConstant.EmptyImage}
            />
            <AppTypography sx={{ textAlign: "center", mt: 5 }}>
              Job Not Found
            </AppTypography>
          </Stack>
        )}
        <Stack spacing={2} alignItems="center" my={5}>
          <Pagination
            page={pagination?.page || AppConstant.DEFAULT_PAGINATION.page}
            count={pagination?.totalPages || 0}
            shape="rounded"
            onChange={handleChangePage}
          />
        </Stack>
      </Box>
    </Container>
  );
};

export default Jobs;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  jobContainer: {
    overflowY: "scroll",
    height: `calc(calc(var(--vh, 1vh) * 100) - ${HEADER_HEIGHT_IN_PX}px)`,
  },
}));
