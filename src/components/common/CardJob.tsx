import { Box, Grid, GridProps, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { LocationIcon } from "components/icons";
import { ThemeProps } from "models/types";
import React from "react";
import AppImage from "./AppImage";
import AppTypography from "./AppTypography";
import clsx from "clsx";

const CardJob = ({ data, ...otherProps }: CardJobProps) => {
  const classes = useStyles();
  return (
    <Grid item {...otherProps}>
      <Box className={classes.root}>
        <Stack spacing={1} alignItems="center">
          <Box className={classes.logoWrapper}>
            {data.companyLogo && (
              <AppImage
                src={data.companyLogo}
                className={classes.logo}
                objectFit="cover"
              />
            )}
          </Box>
          <AppTypography textAlign="center" variant="h5" className="eclipse">
            {data.jobName}
          </AppTypography>
          <AppTypography
            color="grey.400"
            textAlign="center"
            variant="subtitle2"
            className="eclipse"
          >
            {data.companyName}
          </AppTypography>
          <Stack spacing={1} direction="row">
            <LocationIcon />
            <AppTypography
              color="grey.500"
              textAlign="center"
              variant="subtitle2"
              className="eclipse"
            >
              {data.companyLocation}
            </AppTypography>
          </Stack>
          <AppTypography
            variant="caption"
            className={clsx("eclipse", classes.date)}
          >
            {data.date}
          </AppTypography>
        </Stack>
      </Box>
    </Grid>
  );
};

type CardJobProps = GridProps & {
  data: {
    jobName?: string;
    companyName?: string;
    companyLogo?: string;
    companyLocation?: string;
    date?: string;
  };
};

export default CardJob;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    position: "relative",
    border: `1px solid ${theme.palette.grey[300]}`,
    borderTop: `6px solid ${theme.palette.primary.main}`,
    padding: "48px 16px",
    borderRadius: 4,
    cursor: "pointer",

    "&:hover": {
      borderColor: theme.palette.secondary.main,
      backgroundColor: theme.palette.grey[100],
    },
  },
  logoWrapper: {
    width: 200,
    height: 200,
  },
  logo: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    overflow: "hidden",
    border: `1px solid ${theme.palette.grey[400]}`,
  },
  date: {
    position: "absolute",
    top: 8,
    right: 8,
    color: theme.palette.secondary.main,
  },
}));
