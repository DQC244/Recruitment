import { Box, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import React from "react";
import { AppTypography } from "components/common";
import OverviewItem from "../sn-job-detail/OverviewItem";
import {
  CategoryIcon,
  ExperienceIcon,
  LocationIcon,
  TeamSizeIcon,
  TimeCloseIcon,
} from "components/icons";
import { shallowEqual, useSelector } from "react-redux";
import { CompanySelector } from "redux-store";
import dayjs from "dayjs";

const CompanyDetailDescription = () => {
  const classes = useStyles();

  const company = useSelector(CompanySelector.getCompanyInfo, shallowEqual);

  return (
    <Stack direction="row" spacing={3}>
      <Stack spacing={2}>
        <AppTypography variant="h5">About the Company</AppTypography>
        <Box dangerouslySetInnerHTML={{ __html: company.description }}></Box>
      </Stack>
      <Stack spacing={2}>
        <AppTypography variant="h5">Company Overview</AppTypography>
        <Stack className={classes.overView} spacing={3}>
          <OverviewItem
            label="Posted Jobs"
            description={`${MOCK_TOTAL_JOB} jobs`}
            icon={<ExperienceIcon />}
          />
          <OverviewItem
            label="Location"
            description={company.location}
            icon={<LocationIcon />}
          />
          <OverviewItem
            label="Category"
            description={company?.categoryName}
            icon={<CategoryIcon />}
          />
          <OverviewItem
            label="Since"
            description={dayjs(company.since).format("DD-MM-YYYY")}
            icon={<TimeCloseIcon />}
          />
          <OverviewItem
            label="Team Size"
            description={company.teamSize}
            icon={<TeamSizeIcon />}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CompanyDetailDescription;

const MOCK_TOTAL_JOB = 4;

const useStyles = makeStyles((theme: ThemeProps) => ({
  overView: {
    width: 300,
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: 4,
    marginTop: theme.spacing(1),
    padding: theme.spacing(3),
  },
}));
