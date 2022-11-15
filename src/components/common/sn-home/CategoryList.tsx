import React from "react";
import { Grid, Stack } from "@mui/material";
import { ImageConstant } from "const";
import AppTypography from "../AppTypography";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import CategoryCard from "../CategoryCard";

const CategoryList = () => {
  const classes = useStyles();

  return (
    <Stack className={classes.root} spacing={3}>
      <AppTypography variant="h3" textAlign="center">
        Popular Categories
      </AppTypography>
      <Grid container rowSpacing={4}>
        {JOB_LIST.map((item, index) => (
          <CategoryCard xs={3} key={index} data={item} />
        ))}
      </Grid>
    </Stack>
  );
};

export default CategoryList;

const JOB_LIST = [
  {
    category: "Marketing",
    image: ImageConstant.Banner,
  },
  {
    category: "MarketingProduct Owner (Strong English, Remote/ Hybrid)",
    image: ImageConstant.Banner,
  },
  {
    category: "Marketing",
    image: ImageConstant.Banner,
  },
  {
    category: "Marketing",
    image: ImageConstant.Banner,
  },
  {
    category: "Marketing",
    image: ImageConstant.Banner,
  },
  {
    category: "Marketing",
    image: ImageConstant.Banner,
  },
  {
    category: "Marketing",
    image: ImageConstant.Banner,
  },
  {
    category: "Marketing",
    image: ImageConstant.Banner,
  },
];

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    marginTop: 150,

    [theme.breakpoints.down("sm")]: {
      marginTop: 40,
    },
  },
}));
