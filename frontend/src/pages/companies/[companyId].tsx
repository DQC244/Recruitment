import React, { useEffect } from "react";
import { NextPage } from "next";
import { Box, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import {
  BannerCompany,
  CompanyDetailDescription,
  JobPositionsList,
} from "components/common/sn-company";
import { AppConstant, ImageConstant } from "const";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CompanyActions, CompanySelector, JobActions } from "redux-store";

const CompanyDetail: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const companyId = router.query?.companyId;

  const company = useSelector(CompanySelector.getCompanyInfo, shallowEqual);

  useEffect(() => {
    if (companyId) {
      dispatch(CompanyActions.getCompany(companyId));
      dispatch(
        JobActions.getJobList({
          page: AppConstant.DEFAULT_PAGINATION.page,
          size: 5,
        })
      );
    }
  }, [companyId]);

  return (
    <>
      <Box className={classes.banner}>
        <Box className={classes.overlay}>
          <BannerCompany data={company} className={classes.container} />
        </Box>
      </Box>
      <Container>
        <CompanyDetailDescription />
        <JobPositionsList />
      </Container>
    </>
  );
};

export default CompanyDetail;

const useStyles = makeStyles((theme: ThemeProps) => ({
  banner: {
    position: "relative",
    width: "100%",
    height: 500,
    background: `center url(${ImageConstant.CompanyBanner})`,
    marginBottom: 150,
  },
  overlay: {
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,.4)",
  },
  container: {
    position: "absolute",
    bottom: -100,
    width: "80%",
    left: "50%",
    transform: "translateX(-50%)",
  },
}));
