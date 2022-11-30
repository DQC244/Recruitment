import { Box, Button, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  CalenderIcon,
  ExperienceIcon,
  LocationIcon,
  MoneyIcon,
  QualificationIcon,
  RankIcon,
  TimeCloseIcon,
} from "components/icons";
import { ThemeProps } from "models/types";
import React, { memo, useState } from "react";
import AppTypography from "../AppTypography";
import ApplyJobModal from "./ApplyJobModal";
import OverviewItem from "./OverviewItem";

const JobOverview = () => {
  const classes = useStyles();

  const [isOpenApplyModal, setIsOpenApplyModal] = useState(false);

  return (
    <Box>
      <AppTypography variant="h5">Job Overview</AppTypography>
      <Stack className={classes.container} spacing={3}>
        {OVERVIEW_DATA.map((item, index) => (
          <OverviewItem key={index} {...item} />
        ))}
        <Button
          onClick={() => setIsOpenApplyModal(true)}
          variant="contained"
          className={classes.applyButton}
        >
          <AppTypography>Apply for job</AppTypography>
        </Button>
      </Stack>
      <ApplyJobModal
        open={isOpenApplyModal}
        onClose={() => setIsOpenApplyModal(false)}
      />
    </Box>
  );
};

export default memo(JobOverview);

const OVERVIEW_DATA = [
  {
    label: "Date Posted",
    description: "May 5, 2020",
    icon: <CalenderIcon />,
  },
  {
    label: "Expiration Date",
    description: "June 13, 2024",
    icon: <TimeCloseIcon />,
  },
  {
    label: "Location",
    description: "hanoi",
    icon: <LocationIcon />,
  },
  {
    label: "Career Level",
    description: "Director",
    icon: <RankIcon />,
  },
  {
    label: "Experience",
    description: "10+ Years",
    icon: <ExperienceIcon />,
  },
  {
    label: "Qualification",
    description: "Master Degree",
    icon: <QualificationIcon />,
  },
  {
    label: "Salary",
    description: "$35000 - $40000",
    icon: <MoneyIcon />,
  },
];

const useStyles = makeStyles((theme: ThemeProps) => ({
  container: {
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: 4,
    marginTop: theme.spacing(1),
    padding: theme.spacing(3),
  },
  applyButton: {
    textTransform: "uppercase",
  },
}));
