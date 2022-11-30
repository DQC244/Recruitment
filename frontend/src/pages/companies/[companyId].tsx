import React from "react";
import { NextPage } from "next";
import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import {
  BannerCompany,
  CompanyDetailDescription,
  JobPositionsList,
} from "components/common/sn-company";
import { ImageConstant } from "const";

const CompanyDetail: NextPage = () => {
  const classes = useStyles();

  return (
    <>
      <BannerCompany data={DATA} />
      <Container className={classes.root}>
        <CompanyDetailDescription />
        <JobPositionsList />
      </Container>
    </>
  );
};

export default CompanyDetail;

const DATA = {
  name: "Codecanyon",
  imageUrl: ImageConstant.Banner,
  phone: "329947238",
  email: "company@gmail.com",
  website: {
    web: "href",
    facebook: "href",
    linkedin: "href",
    twitter: "href",
  },
};

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {},
}));
