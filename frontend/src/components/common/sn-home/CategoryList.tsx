import React from "react";
import { Grid, Stack } from "@mui/material";
import AppTypography from "../AppTypography";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import CategoryCard from "../CategoryCard";
import { shallowEqual, useSelector } from "react-redux";
import { CompanySelector } from "redux-store";

const CategoryList = () => {
  const classes = useStyles();
  const categories = useSelector(CompanySelector.getCategoryList, shallowEqual);

  return (
    <Stack className={classes.root} spacing={3}>
      <AppTypography variant="h3" textAlign="center">
        Popular Categories
      </AppTypography>
      <Grid container rowSpacing={4}>
        {categories.slice(0,3).map((item, index) => (
          <CategoryCard xs={4} key={index} data={item} />
        ))}
      </Grid>
    </Stack>
  );
};

export default CategoryList;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    marginTop: 150,

    [theme.breakpoints.down("sm")]: {
      marginTop: 40,
    },
  },
}));
