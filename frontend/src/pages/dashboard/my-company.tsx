import React from "react";
import { NextPage } from "next";
import { Box, Button, Container, Stack } from "@mui/material";
import { SideBar } from "components/common/sn-dashboard";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import {
  BannerCompany,
  CompanyDetailDescription,
} from "components/common/sn-company";
import {
  CategoryIcon,
  ExperienceIcon,
  LocationIcon,
  TeamSizeIcon,
  TimeCloseIcon,
} from "components/icons";
import { ImageConstant } from "const";

const MyCompany: NextPage = () => {
  const classes = useStyles();

  return (
    <Stack direction="row" pl={37.5} spacing={3}>
      <SideBar />
      <Stack pr={3} spacing={3}>
        <Button sx={{ width: 148, mt: 3 }} variant="contained">
          Edit
        </Button>
        <BannerCompany data={DATA} />
        <CompanyDetailDescription />
      </Stack>
    </Stack>
  );
};

export default MyCompany;

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
  root: {
    minHeight: "100vh",
    height: "100vh",
  },
}));
