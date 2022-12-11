import { Stack } from "@mui/material";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { JobSelector } from "redux-store";
import AppTypography from "../AppTypography";
import { JobCard } from "../sn-jobs";

const JobPositionsList = () => {
  const jobList = useSelector(JobSelector.getJobList, shallowEqual);

  return (
    <Stack spacing={1} mt={5}>
      <AppTypography variant="h5">Job Positions</AppTypography>
      {jobList?.listItems?.map((item, index) => (
        <JobCard key={index} data={item} />
      ))}
    </Stack>
  );
};

export default JobPositionsList;
