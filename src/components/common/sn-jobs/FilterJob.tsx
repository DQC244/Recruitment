import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppTypography } from "components/common";
import JobType from "components/common/filter/JobType";
import clsx from "clsx";
import Location from "components/common/filter/Location";
import CategoriesFilter from "../filter/CategoriesFilter";
import SalaryFilter from "../filter/SalaryFilter";

const FilterJob = () => {
  const classes = useStyles();

  const handleChangeJob = (value?: any) => {
    console.log(value);
    return;
  };
  const handleChangeCategories = (value?: any) => {
    console.log(value);
    return;
  };
  const handleChangeLocation = (value?: any) => {
    console.log(value);
    return;
  };
  const handleChangeSalary = (value?: any) => {
    console.log(value);
    return;
  };

  return (
    <Box className={classes.root}>
      <Button className={classes.headerButton}>
        <AppTypography color="error.main">Clear all filters</AppTypography>
      </Button>
      <Stack
        spacing={3}
        className={clsx("hidden-scrollbar", classes.filterWrapper)}
      >
        <SalaryFilter onChangeValue={handleChangeSalary} />
        <JobType className={classes.job} onChange={handleChangeJob} />
        <CategoriesFilter onChangeCategories={handleChangeCategories} />
        <Location onChangeLocation={handleChangeLocation} />
      </Stack>
    </Box>
  );
};

export default FilterJob;

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    minWidth: 250,
    height: "100%",
    padding: "45px 0px 16px",
  },
  headerButton: {
    position: "absolute",
    top: 13,
    right: 13,
    width: "fit-content",
    padding: 4,
    minHeight: "unset",
  },
  filterWrapper: {
    padding: "0px 8px",
    height: "100%",
    overflowY: "scroll",
  },
  job: {
    width: "100%",
  },
}));
