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

const CompanyDetailDescription = () => {
  const classes = useStyles();
  return (
    <Stack className={classes.root} direction="row" spacing={3}>
      <Stack spacing={2}>
        <AppTypography variant="h5">About the Company</AppTypography>
        <AppTypography>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex.
        </AppTypography>
      </Stack>
      <Stack spacing={2}>
        <AppTypography variant="h5">Company Overview</AppTypography>
        <Stack className={classes.overView} spacing={3}>
          {OVERVIEW_DATA.map((item, index) => (
            <OverviewItem key={index} {...item} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CompanyDetailDescription;

const OVERVIEW_DATA = [
  {
    label: "Posted Jobs",
    description: "1 job",
    icon: <ExperienceIcon />,
  },
  {
    label: "Location",
    description: "hanoi",
    icon: <LocationIcon />,
  },
  {
    label: "Category",
    description: "Technology",
    icon: <CategoryIcon />,
  },
  {
    label: "Since",
    description: "June 13, 2024",
    icon: <TimeCloseIcon />,
  },

  {
    label: "Team Size",
    description: "101-200",
    icon: <TeamSizeIcon />,
  },
];

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    paddingTop: 80,
  },
  overView: {
    width: 300,
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: 4,
    marginTop: theme.spacing(1),
    padding: theme.spacing(3),
  },
}));
