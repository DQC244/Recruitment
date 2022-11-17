import React, { useMemo } from "react";
import { Box, Button, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppConstant, ImageConstant, PathConstant } from "const";
import { ThemeProps } from "models/types";
import { AppTypography } from "components/common";
import { UnHiddenIcon } from "components/icons";
import { getLabelJobType } from "./helper";
import Image from "next/image";

const JobCard = ({ data }: JobCardProps) => {
  const classes = useStyles();

  const jobTypeLabel = useMemo(
    () => getLabelJobType(data?.jobType),
    [data?.jobType]
  );

  return (
    <Stack spacing={3} direction="row" className={classes.root}>
      <Box className={classes.imageWrapper}>
        <Image
          src={ImageConstant.LogoImage}
          layout="fill"
          objectFit="contain"
          draggable={false}
        />
        <Box className={classes.jobType}>
          <AppTypography variant="body2">{jobTypeLabel}</AppTypography>
        </Box>
      </Box>
      <Stack spacing={1.5} className={classes.content}>
        <AppTypography variant="h5">{data?.jobName}</AppTypography>
        <AppTypography variant="body2" color="grey.500">
          Company: {data?.companyName}
        </AppTypography>
        <AppTypography variant="body2" color="grey.500">
          Location: {data?.location}
        </AppTypography>
        {data?.rate && (
          <AppTypography variant="body2" color="grey.500">
            Rate: {data.rate}
          </AppTypography>
        )}
        {data?.salary && (
          <AppTypography variant="body2" color="grey.500">
            Salary: {data.salary}
          </AppTypography>
        )}
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            href={`${PathConstant.JOBS}/${data?.jobId}`}
            className={classes.button}
            variant="contained"
            endIcon={<UnHiddenIcon />}
          >
            View Details
          </Button>
          <AppTypography variant="body2" color="grey.300">
            {data?.postedDate}
          </AppTypography>
        </Stack>
      </Stack>
    </Stack>
  );
};

type JobCardProps = {
  data?: {
    jobId?: string;
    jobType?: typeof AppConstant.JOB_TYPE[keyof typeof AppConstant.JOB_TYPE];
    jobName?: string;
    companyName?: string;
    location?: string;
    rate?: string;
    salary?: string;
    postedDate?: string;
  };
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
