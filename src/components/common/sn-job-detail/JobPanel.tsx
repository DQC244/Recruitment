import { Box, Button, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppConstant } from "const";
import { ThemeProps } from "models/types";
import React, { useMemo } from "react";
import AppTypography from "../AppTypography";
import clsx from "clsx";
import { getLabelJobType } from "../sn-jobs/helper";
import AppImage from "../AppImage";

const JobPanel = ({ data }: JobPanelProps) => {
  const classes = useStyles();

  const jobTypeLabel = useMemo(
    () => getLabelJobType(data?.jobType),
    [data?.jobType]
  );

  return (
    <Box className={clsx("space-between-root", classes.root)}>
      <Stack direction="row" spacing={2} alignItems="center">
        <AppImage className={classes.image} src={data?.image} />
        <Stack spacing={2}>
          <AppTypography variant="h3" color="grey.600">
            {data?.name}
          </AppTypography>
          <AppTypography variant="subtitle2" className={classes.jobLabel}>
            {jobTypeLabel}
          </AppTypography>
        </Stack>
      </Stack>
      <Button variant="contained">Direct message</Button>
    </Box>
  );
};

type JobPanelProps = {
  data?: {
    name?: string;
    image?: string;
    jobType?: typeof AppConstant.JOB_TYPE[keyof typeof AppConstant.JOB_TYPE];
  };
};

export default JobPanel;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    width: "100%",
    background: "#f6f6f6",
    padding: "80px 24px",
  },
  image: {
    width: 120,
    height: 120,
  },
  jobLabel: {
    width: "fit-content",
    padding: "2px 6px",
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    borderRadius: 2,
  },
}));
