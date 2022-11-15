import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppTypography } from "components/common";
import JobType from "components/filter/JobType";
import clsx from "clsx";

const FilterJob = () => {
  const classes = useStyles();

  const handleChangeJob = (value?: any) => {
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
        <JobType className={classes.job} value={1} onChange={handleChangeJob} />
        <JobType className={classes.job} value={1} onChange={handleChangeJob} />
        <JobType className={classes.job} value={1} onChange={handleChangeJob} />
        <JobType className={classes.job} value={1} onChange={handleChangeJob} />
        <JobType className={classes.job} value={1} onChange={handleChangeJob} />
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
    borderRight: "1px solid #e9e9e9",
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
    height: "100%",
    overflowY: "scroll",
  },
  job: {
    width: "100%",
  },
}));
