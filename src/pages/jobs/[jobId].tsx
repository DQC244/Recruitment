import React from "react";
import { NextPage } from "next";
import { Box, Container, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { JobPanel, CompanyPanel } from "components/common/sn-job-detail";
import { ImageConstant } from "const";

const JobsDetail: NextPage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <JobPanel data={DATA} />
      <Stack direction="row" sx={{ my: 10 }}>
        <Stack flex={1}>
          <CompanyPanel data={DATA} />
        </Stack>
        <Box width={300}></Box>
      </Stack>
    </Container>
  );
};

const DATA = {
  name: "Finance Manager",
  jobType: 1,
  image: ImageConstant.LogoImage,
  companyLogo: ImageConstant.LogoImage,
  email: "chien@gmail.com",
  companyName: "facebook",
};

export default JobsDetail;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {},
  form: {
    margin: "100px auto",
  },
}));
