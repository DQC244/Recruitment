import { Stack } from "@mui/material";
import React from "react";
import AppTypography from "../AppTypography";
import { JobCard } from "../sn-jobs";

const JobPositionsList = () => {
  return (
    <Stack spacing={1} mt={5}>
      <AppTypography variant="h5">Job Positions</AppTypography>
      {DATA.map((item, index) => (
        <JobCard key={index} data={item} />
      ))}
    </Stack>
  );
};

export default JobPositionsList;
const DATA = [
  {
    jobId: 1,
    jobName: "develop",
    companyName: "facebook",
    rate: "2$ - 3$ /hours",
    salary: "300$-400$",
    jobType: 1,
    location: "hanoi",
    postedDate: "Posted 3 years ago",
  },
  {
    jobId: 2,
    jobName: "develop",
    companyName: "facebook",
    rate: "2$ - 3$ /hours",
    salary: "300$-400$",
    jobType: 1,
    location: "hanoi",
    postedDate: "Posted 3 years ago",
  },
  {
    jobId: 3,
    jobName: "develop",
    companyName: "facebook",
    rate: "2$ - 3$ /hours",
    salary: "300$-400$",
    jobType: 1,
    location: "hanoi",
    postedDate: "Posted 3 years ago",
  },
  {
    jobId: 4,
    jobName: "develop",
    companyName: "facebook",
    rate: "2$ - 3$ /hours",
    salary: "300$-400$",
    jobType: 1,
    location: "hanoi",
    postedDate: "Posted 3 years ago",
  },
];
