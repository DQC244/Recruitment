import React from "react";
import { Stack } from "@mui/material";
import { ImageConstant } from "const";
import AppTypography from "../AppTypography";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import PrimarySlider from "../PrimarySlider";
import CompanyCard from "../CompanyCard";

const FeaturedEmployers = () => {
  const classes = useStyles();

  return (
    <Stack className={classes.root} spacing={3}>
      <AppTypography variant="h3" textAlign="center">
        Featured Employers
      </AppTypography>
      <PrimarySlider className={classes.slide} {...SETTINGS}>
        {JOB_LIST.map((item, index) => (
          <CompanyCard key={index} data={item} />
        ))}
      </PrimarySlider>
    </Stack>
  );
};

export default FeaturedEmployers;

const SETTINGS = {
  infinite: true,
  arrows: true,
  slidesToShow: 5,
  autoplay: true,
  autoplaySpeed: 2000,
};

const JOB_LIST = [
  {
    jobName: "CEO",
    companyName: "Facebook",
    companyLogo: ImageConstant.Banner,
    companyLocation: "hanoi",
  },
  {
    jobName: "Product Owner (Strong English, Remote/ Hybrid)",
    companyName: "Facebook Faceboo kFacebo okFacebook",
    companyLogo: ImageConstant.Banner,
    companyLocation: "hanoi",
  },
  {
    jobName: "CEO",
    companyName: "Facebook",
    companyLogo: ImageConstant.Banner,
    companyLocation: "hanoi",
  },
  {
    jobName: "CEO",
    companyName: "Facebook",
    companyLogo: ImageConstant.Banner,
    companyLocation: "hanoi",
  },
  {
    jobName: "CEO",
    companyName: "Facebook",
    companyLogo: ImageConstant.Banner,
    companyLocation: "hanoi",
  },
  {
    jobName: "CEO",
    companyName: "Facebook",
    companyLogo: ImageConstant.Banner,
    companyLocation: "hanoi",
  },
  {
    jobName: "CEO",
    companyName: "Facebook",
    companyLogo: ImageConstant.Banner,
    companyLocation: "hanoi",
  },
  {
    jobName: "CEO",
    companyName: "Facebook",
    companyLogo: ImageConstant.Banner,
    companyLocation: "hanoi",
  },
];

const useStyles = makeStyles((theme: ThemeProps) => ({
  slide: {
    backgroundColor: theme.palette.grey[100],
    padding: "24px 16px",
  },
  root: {
    marginTop: 150,

    [theme.breakpoints.down("sm")]: {
      marginTop: 40,
    },
  },
}));
