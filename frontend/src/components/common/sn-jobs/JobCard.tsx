import React, { useMemo } from "react";
import { Box, Button, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppConstant, ImageConstant, PathConstant } from "const";
import { ThemeProps } from "models/types";
import { AppTypography } from "components/common";
import { UnHiddenIcon } from "components/icons";
import { getLabelJobType } from "./helper";
import Image from "next/image";
import { JobClass } from "models";

const JobCard = ({ data }: JobCardProps) => {
  const classes = useStyles();

  const jobTypeLabel = useMemo(() => getLabelJobType(data?.type), [data?.type]);

  return (
    <Stack spacing={3} direction="row" className={classes.root}>
      <Box className={classes.imageWrapper}>
        <Box className={classes.image} component="img" src={data?.image} />
        <Box className={classes.jobType}>
          <AppTypography variant="body2">{jobTypeLabel}</AppTypography>
        </Box>
      </Box>
      <Stack spacing={1.5} className={classes.content}>
        <AppTypography variant="h5">{data?.title}</AppTypography>
        <AppTypography variant="body2" color="grey.500">
          Location: {data?.location}
        </AppTypography>
        {data?.salary && (
          <AppTypography variant="body2" color="grey.500">
            Salary: {`$${data?.salary?.min} - $${data?.salary?.max}`}
          </AppTypography>
        )}
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            href={`${PathConstant.JOBS}/${data?._id}`}
            className={classes.button}
            variant="contained"
            endIcon={<UnHiddenIcon />}
          >
            View Details
          </Button>
          <AppTypography variant="body2" color="grey.300">
            {data?.updatedAt}
          </AppTypography>
        </Stack>
      </Stack>
    </Stack>
  );
};

type JobCardProps = {
  data?: JobClass;
};

export default JobCard;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    width: "100%",
    minHeight: 250,
    display: "flex",
    alignItems: "center",
    padding: "24px 0px",
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  imageWrapper: {
    position: "relative",
    width: 200,
    height: 200,
    backgroundColor: theme.palette.grey[100],
    borderRadius: 4,
    boxShadow: "5px 5px 25px rgb(0 0 0 / 8%)",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
  },
  button: {
    width: "fit-content",
  },
  jobType: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    padding: "4px 8px",
    borderRadius: 2,
  },
}));
