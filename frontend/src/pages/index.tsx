import React from "react";
import { NextPage } from "next";
import { Container } from "@mui/material";
import {
  Banner,
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
    </>
  );
};

export default Home;
