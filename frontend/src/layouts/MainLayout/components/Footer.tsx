import { Box, Grid, IconButton, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppTypography } from "components/common";
import { FacebookIcon, TelegramIcon, TwitterIcon } from "components/icons";
import { ThemeProps } from "models/types";
import React from "react";

const Footer = () => {
  const classes = useStyles();
  return (
    <Stack className={classes.root}>
      <Grid container spacing={24}>
        <Grid item>
          <AppTypography className={classes.text} variant="h5">
            For Candidates
          </AppTypography>
          <AppTypography className={classes.text}>Companies</AppTypography>
          <AppTypography className={classes.text}>Companies List</AppTypography>
          <AppTypography className={classes.text}>Jobs</AppTypography>
        </Grid>
        <Grid item>
          <AppTypography className={classes.text} variant="h5">
            For Employers
          </AppTypography>
          <AppTypography className={classes.text}>Job Dashboard</AppTypography>
          <AppTypography className={classes.text}>Post Company</AppTypography>
          <AppTypography className={classes.text}>Post Job</AppTypography>
        </Grid>
      </Grid>
      <Stack direction="row" alignItems="center">
        <Box flex={1}>
          <AppTypography color="grey.500">
            Copyright © DQC. Developed by DQC
          </AppTypography>
        </Box>
        <Stack direction="row">
          <IconButton className={classes.socialNetwork}>
            <FacebookIcon />
          </IconButton>
          <IconButton className={classes.socialNetwork}>
            <TwitterIcon />
          </IconButton>
          <IconButton className={classes.socialNetwork}>
            <TelegramIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Footer;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    padding: 40,
    minHeight: 300,
    background: "#1c2733",
    position: "relative",
    justifyContent: "space-between",
  },
  socialNetwork: {
    borderRadius: "50%",
    color: theme.palette.grey[500],
    fontSize: 24,
  },
  text: {
    color: theme.palette.grey[400],
    marginTop: 12,
  },
}));
