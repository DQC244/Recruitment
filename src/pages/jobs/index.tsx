import React, { useState } from "react";
import { NextPage } from "next";
import { Box, Container, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { FilterJob, JobCard } from "components/common/sn-jobs";
import InfiniteScroll from "react-infinite-scroll-component";
import clsx from "clsx";
import { HEADER_HEIGHT_IN_PX } from "layouts/MainLayout/components/MLHeader";
import { AppTypography } from "components/common";

const Jobs: NextPage = () => {
  const classes = useStyles();
  const [isMoreList, setIsMoreList] = useState(true);
  let currentPage = 1;
  const totalPage = 4;

  const handleGetListJob = () => {
    if (currentPage >= totalPage) {
      setIsMoreList(false);
    }
    currentPage + 1;
  };

  return (
    <Container className={classes.root}>
      <Stack spacing={3} direction="row" width="100%">
        <FilterJob />
        <Box width="100%">
          <Box className={clsx("hidden-scrollbar", classes.wrapper)}>
            <InfiniteScroll
              hasMore={isMoreList}
              next={handleGetListJob}
              loader={<h4>Loading...</h4>}
              dataLength={DATA.length}
            >
              <AppTypography variant="h3" sx={{ py: 2 }}>
                Job List
              </AppTypography>
              {DATA.map((item, index) => (
                <JobCard key={index} data={item} />
              ))}
            </InfiniteScroll>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default Jobs;

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
  {
    jobId: 5,
    jobName: "develop",
    companyName: "facebook",
    rate: "2$ - 3$ /hours",
    salary: "300$-400$",
    jobType: 1,
    location: "hanoi",
    postedDate: "Posted 3 years ago",
  },
  {
    jobId: 6,
    jobName: "develop",
    companyName: "facebook",
    rate: "2$ - 3$ /hours",
    salary: "300$-400$",
    jobType: 1,
    location: "hanoi",
    postedDate: "Posted 3 years ago",
  },
  {
    jobId: 7,
    jobName: "develop",
    companyName: "facebook",
    rate: "2$ - 3$ /hours",
    salary: "300$-400$",
    jobType: 1,
    location: "hanoi",
    postedDate: "Posted 3 years ago",
  },
];

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    height: `calc(calc(var(--vh, 1vh) * 100) - ${HEADER_HEIGHT_IN_PX}px)`,
  },
  wrapper: {
    overflowY: "scroll",
    height: "100%",

    "& > div": {
      width: "100%",
    },
  },
}));
