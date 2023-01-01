import { Button, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { SearchIcon, TelegramIcon, UserIcon } from "components/icons";
import { ThemeProps } from "models/types";
import React from "react";
import AppTypography from "../AppTypography";

const GetStarted = () => {
  const classes = useStyles();

  return (
    <Stack className={classes.root} my={20} direction="row">
      <Stack className="center-root" spacing={2}>
        <AppTypography textAlign="center" variant="h1" fontWeight={700}>
          Start now!
        </AppTypography>
        <AppTypography textAlign="center" variant="h4" color="primary.main">
          Tips and Tricks on how to succeed
        </AppTypography>
      </Stack>
      <Stack direction="row" spacing={3}>
        <Stack alignItems="center" className={classes.paper} spacing={3}>
          <Button className={classes.icon} disableRipple disableFocusRipple>
            <UserIcon />
          </Button>
          <AppTypography className={classes.subTitle} variant="h5">
            Register
          </AppTypography>
          <AppTypography color="grey.600" textAlign="center">
            Sign up as an Employer or a Candidate for free.
          </AppTypography>
        </Stack>
        <Stack alignItems="center" className={classes.paper} spacing={3}>
          <Button className={classes.icon} disableRipple disableFocusRipple>
            <SearchIcon />
          </Button>
          <AppTypography className={classes.subTitle} variant="h5">
            Search
          </AppTypography>
          <AppTypography color="grey.600" textAlign="center">
            Browse throught open positions to find the right job for you.
          </AppTypography>
        </Stack>
        <Stack alignItems="center" className={classes.paper} spacing={3}>
          <Button className={classes.icon} disableRipple disableFocusRipple>
            <TelegramIcon />
          </Button>
          <AppTypography className={classes.subTitle} variant="h5">
            Apply
          </AppTypography>
          <AppTypography color="grey.600" textAlign="center">
            Apply to a job with your resume and change your Career.
          </AppTypography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default GetStarted;
// ECandidateImage

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    background: "#F5F7FC",
    padding: "80px 24px",
    justifyContent: "space-between",
  },
  paper: {
    boxShadow: "0px 10px 30px 0px rgb(0 0 0 / 10%)",
    width: 250,
    height: 300,
    background: "white",
    padding: 16,
  },
  icon: {
    fontSize: 70,
    color: theme.palette.primary.main,
    cursor: "default",
  },
  subTitle: {
    color: theme.palette.primary.main,
  },
}));
