import React from "react";
import { Stack } from "@mui/material";
import { ImageConstant } from "const";
import AppTypography from "../AppTypography";
import CardJob from "../CardJob";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import PrimarySlider from "../PrimarySlider";

const LatestJobList = () => {
  const classes = useStyles();

  return (
    <Stack className={classes.root} spacing={3}>
      <AppTypography variant="h3" textAlign="center">
        Latest Jobs
      </AppTypography>
      <PrimarySlider {...SETTINGS}>
        {JOB_LIST.map((item, index) => (
          <CardJob key={index} data={item} />
        ))}
      </PrimarySlider>
    </Stack>
  );
};

export default LatestJobList;

const SETTINGS = {
  infinite: false,
  arrows: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  dots: true,
};

const JOB_LIST = [
  {
    jobName: "CEO",
    companyName: "Facebook",
    companyLogo: ImageConstant.Banner,
    companyLocation: "hanoi",
    date: "3 days ago",
  },
  {
    jobName: "Product Owner (Strong English, Remote/ Hybrid)",
    companyName: "Facebook",
    companyLogo: ImageConstant.Banner,
    companyLocation: "hanoi",
    date: "3 days ago",
  },
  {
    jobName: "CEO",
    companyName: "Facebook",
    companyLogo: ImageConstant.Banner,
    companyLocation: "hanoi",
    date: "3 days ago",
  },
  {
    jobName: "CEO",
    companyName: "Facebook",
    companyLogo: ImageConstant.Banner,
    companyLocation: "hanoi",
    date: "3 days ago",
  },
  {
    jobName: "CEO",
    companyName: "Facebook",
    companyLogo: ImageConstant.Banner,
    companyLocation: "hanoi",
    date: "3 days ago",
  },
  {
    jobName: "CEO",
    companyName: "Facebook",
    companyLogo: ImageConstant.Banner,
    companyLocation: "hanoi",
    date: "3 days ago",
  },
  {
    jobName: "CEO",
    companyName: "Facebook",
    companyLogo: ImageConstant.Banner,
    companyLocation: "hanoi",
    date: "3 days ago",
  },
  {
    jobName: "CEO",
    companyName: "Facebook",
    companyLogo: ImageConstant.Banner,
    companyLocation: "hanoi",
    date: "3 days ago",
  },
  {
    jobName: "CEO",
    companyName: "Facebook",
    companyLogo: ImageConstant.Banner,
    companyLocation: "hanoi",
    date: "3 days ago",
  },
  {
    jobName: "CEO",
    companyName: "Facebook",
    companyLogo: ImageConstant.Banner,
    companyLocation: "hanoi",
    date: "3 days ago",
  },
  {
    jobName: "CEO",
    companyName: "Facebook",
    companyLogo: ImageConstant.Banner,
    companyLocation: "hanoi",
    date: "3 days ago",
  },
  {
    jobName: "CEO",
    companyName: "Facebook",
    companyLogo: ImageConstant.Banner,
    companyLocation: "hanoi",
    date: "3 days ago",
  },
  {
    jobName: "CEO",
    companyName: "Facebook",
    companyLogo: ImageConstant.Banner,
    companyLocation: "hanoi",
    date: "3 days ago",
  },
  {
    jobName: "CEO",
    companyName: "Facebook",
    companyLogo: ImageConstant.Banner,
    companyLocation: "hanoi",
    date: "3 days ago",
  },
];

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    marginTop: 100,
  },
}));
