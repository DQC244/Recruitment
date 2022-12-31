import React, { useEffect } from "react";
import { NextPage } from "next";
import { Container } from "@mui/material";
import {
  Banner,
  GetStarted,
  CategoryList,
  FeaturedEmployers,
  LatestJobList,
} from "components/common/sn-home";
import { useDispatch } from "react-redux";
import { CompanyActions, JobActions } from "redux-store";
import { AppConstant } from "const";

const Home: NextPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CompanyActions.getCategoryList());
    dispatch(
      JobActions.getJobList({
        page: AppConstant.DEFAULT_PAGINATION.page,
        size: 8,
      })
    );
  }, []);

  return (
    <>
      <Banner />
      <Container>
        <CategoryList />
      </Container>

      <Container>
        <FeaturedEmployers />
      </Container>
        <GetStarted />
      <Container>
        <LatestJobList />
      </Container>
    </>
  );
};

export default Home;
