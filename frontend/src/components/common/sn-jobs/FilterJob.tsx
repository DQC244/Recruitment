import React, { ChangeEvent, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppInput, AppTypography } from "components/common";
import JobType from "components/common/filter/JobType";
import clsx from "clsx";
import CategoriesFilter from "../filter/CategoriesFilter";
import SalaryFilter from "../filter/SalaryFilter";
import FilterLayout from "../filter/FilterLayout";
import { CommonUtils } from "utils";
import { useDispatch, useSelector } from "react-redux";
import { JobActions, JobSelector } from "redux-store";
import { AppConstant } from "const";

const FilterJob = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const queryParams = useSelector(JobSelector.getQueryParams);

  const [location, setLocation] = useState("");

  const handleDebounce = CommonUtils.debounce((queryParams: any) => {
    dispatch(
      JobActions.setQueryParams({
        ...queryParams,
      })
    );
  }, AppConstant.DEBOUNCE_TIME_IN_MILLISECOND);

  const handleChangeJobType = (value?: any) => {
    const newQuery = {
      ...queryParams,
      type: value,
    };
    handleDebounce(newQuery);
  };

  const handleChangeExperience = (value?: any) => {
    const newQuery = {
      ...queryParams,
      experience: value,
    };
    handleDebounce(newQuery);
  };

  const handleChangeLocation = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.currentTarget.value);
    const newQuery = {
      ...queryParams,
      location: event.currentTarget.value,
    };
    handleDebounce(newQuery);
  };

  const handleChangeSalary = (value?: any) => {
    if (!value) return;
    const newQuery = {
      ...queryParams,
      salary: value,
    };
    handleDebounce(newQuery);
  };

  const handleResetParams = () => {
    setLocation("");
    dispatch(JobActions.resetQueryParams());
  };

  return (
    <Box className={classes.root}>
      <Button className={classes.headerButton} onClick={handleResetParams}>
        <AppTypography color="error.main">Clear all filters</AppTypography>
      </Button>
      <Stack
        spacing={3}
        className={clsx("hidden-scrollbar", classes.filterWrapper)}
      >
        <SalaryFilter
          onChangeValue={handleChangeSalary}
          data={queryParams?.salary}
        />
        <FilterLayout title="Location">
          <AppInput onChange={handleChangeLocation} value={location} />
        </FilterLayout>
        <JobType
          data={queryParams?.type}
          className={classes.job}
          onChange={handleChangeJobType}
        />
        <CategoriesFilter
          data={queryParams?.experience}
          onChangeCategories={handleChangeExperience}
        />
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
