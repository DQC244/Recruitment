import React from "react";
import { NextPage } from "next";
import { Container } from "@mui/material";
import {
  Banner,
  CategoryList,
  FeaturedEmployers,
  LatestJobList,
} from "components/common/sn-home";
import CompanyActionPanel from "components/common/CompanyActionPanel";

const Create: NextPage = () => {
  return (
    <>
      <Container>
        <CompanyActionPanel />
      </Container>
    </>
  );
};

export default Create;
