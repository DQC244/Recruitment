import React from "react";
import { NextPage } from "next";
import { Container } from "@mui/material";
import {
  Banner,
  GetStarted,
  CategoryList,
  FeaturedEmployers,
  LatestJobList,
} from "components/common/sn-home";

const Home: NextPage = () => {
  return (
    <>
      <Banner />
      <Container>
        <CategoryList />
        <FeaturedEmployers />
        <LatestJobList />
      </Container>
      <GetStarted />
    </>
  );
};

export default Home;
