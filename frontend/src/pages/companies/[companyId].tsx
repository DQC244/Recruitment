import React, { useEffect } from "react";
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
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CompanyActions, CompanySelector } from "redux-store";

const CompanyDetail: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const companyId = router.query?.companyId;

  const company = useSelector(CompanySelector.getCompanyInfo, shallowEqual);

  useEffect(() => {
    if (companyId) {
      dispatch(CompanyActions.getCompany(companyId));
    }
  }, [companyId]);

  return (
    <>
      <BannerCompany data={company} />
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
