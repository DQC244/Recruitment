import { Box, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import React from "react";
import AppTypography from "../AppTypography";
import clsx from "clsx";
import { getLabelJobType } from "../sn-jobs/helper";
import { JobClass } from "models";

const JobPanel = ({ data }: JobPanelProps) => {
  const classes = useStyles();

  return (
    <Box className={clsx("space-between-root", classes.root)}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box component="img" className={classes.image} src={data?.image} />
        <Stack spacing={2}>
          <AppTypography variant="h3" color="grey.600">
            {data?.title}
          </AppTypography>
          <AppTypography variant="subtitle2" className={classes.jobLabel}>
            {getLabelJobType(data?.type)}
          </AppTypography>
        </Stack>
      </Stack>
    </Box>
  );
};

type JobPanelProps = {
  data?: JobClass;
};

export default JobPanel;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    width: "100%",
    padding: "80px 24px",
    borderRadius: 16,
    boxShadow: "5px 5px 25px rgb(0 0 0 / 8%)",
  },
  image: {
    width: 120,
    height: 120,
    objectFit: "contain",
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: 4,
  },
  jobLabel: {
    width: "fit-content",
    padding: "2px 6px",
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    borderRadius: 2,
  },
}));
