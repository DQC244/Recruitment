import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { AppConstant, ImageConstant, PathConstant } from "const";
import AppTypography from "../AppTypography";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import PrimarySlider from "../PrimarySlider";
import CompanyCard from "../CompanyCard";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CompanyActions, CompanySelector } from "redux-store";
import { useRouter } from "next/router";

const FeaturedEmployers = () => {
  const classes = useStyles();
  const router = useRouter();

  const dispatch = useDispatch();
  const companyList = useSelector(CompanySelector.getCompanyList, shallowEqual);

  const handleClickJob = (id?: string) => {
    router.push(`${PathConstant.COMPANY}/${id}`);
  };

  useEffect(() => {
    dispatch(
      CompanyActions.getCompanyList({
        status: AppConstant.STATUS.published,
        page: AppConstant.DEFAULT_PAGINATION.page,
        size: 6,
      })
    );
  }, []);

  return (
    <Stack className={classes.root} spacing={3}>
      <AppTypography variant="h3" textAlign="center">
        Featured Company
      </AppTypography>
      <PrimarySlider className={classes.slide} {...SETTINGS}>
        {companyList?.listItems?.map((item, index) => (
          <CompanyCard
            key={index}
            data={item}
            onClick={() => handleClickJob(item._id)}
          />
        ))}
      </PrimarySlider>
    </Stack>
  );
};

export default FeaturedEmployers;

const SETTINGS = {
  infinite: true,
  arrows: true,
  slidesToShow: 5,
  autoplay: true,
  autoplaySpeed: 2000,
};

const useStyles = makeStyles((theme: ThemeProps) => ({
  slide: {
    backgroundColor: theme.palette.grey[100],
    padding: "24px 16px",
  },
  root: {
    marginTop: 150,

    [theme.breakpoints.down("sm")]: {
      marginTop: 40,
    },
  },
}));
