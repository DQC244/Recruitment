import React from "react";
import { NextPage } from "next";
import { Container } from "@mui/material";
import { EnvConstant, PathConstant } from "const";

const UIDemo: NextPage = () => {
  return <Container>UIDemo</Container>;
};

export const getServerSideProps = async () => {
  return EnvConstant.IS_DEV
    ? { props: {} }
    : {
        redirect: {
          permanent: false,
          destination: PathConstant.ROOT,
        },
      };
};

export default UIDemo;
