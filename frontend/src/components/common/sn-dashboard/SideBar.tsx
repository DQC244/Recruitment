import { Box, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppConstant, PathConstant } from "const";
import { ThemeProps } from "models/types";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { AppLink, AppTypography } from "components/common";
import clsx from "clsx";
import { useAuthContext } from "context";

const SideBar = () => {
  const classes = useStyles();
  const router = useRouter();

  const { accountInfo } = useAuthContext();

  const value = useMemo(() => {
    switch (router.pathname) {
      case PathConstant.DASHBOARD:
        return PathConstant.DASHBOARD;
      case PathConstant.MY_JOB_DASHBOARD:
        return PathConstant.MY_JOB_DASHBOARD;
      case PathConstant.MY_COMPANY_DASHBOARD:
        return PathConstant.MY_COMPANY_DASHBOARD;
      case PathConstant.PROFILES_DASHBOARD:
        return PathConstant.PROFILES_DASHBOARD;
      default:
        return false;
    }
  }, [router.pathname]);

  return (
    <Box className={classes.root}>
      <Stack spacing={2} className={classes.header}>
        <Box
          component="img"
          className={classes.imageUser}
          src={accountInfo.image}
        />
        <AppTypography color="common.white" variant="subtitle1">
          {accountInfo.permission === AppConstant.USER_TYPE.employer
            ? "Employer"
            : "Candidate"}
        </AppTypography>
      </Stack>
      <Stack sx={{ p: 2 }}>
        <AppTypography className={classes.item} variant="subtitle1">
          Main
        </AppTypography>
        <Stack>
          {accountInfo.permission === AppConstant.USER_TYPE.employer && (
            <>
              <AppLink
                href={PathConstant.DASHBOARD}
                className={clsx(
                  classes.item,
                  PathConstant.DASHBOARD === value && classes.checked
                )}
                variant="body2"
              >
                Dashboard
              </AppLink>
              <AppLink
                href={PathConstant.MY_JOB_DASHBOARD}
                className={clsx(
                  classes.item,
                  PathConstant.MY_JOB_DASHBOARD === value && classes.checked
                )}
                variant="body2"
              >
                My Job
              </AppLink>
              <AppLink
                href={PathConstant.MY_COMPANY_DASHBOARD}
                className={clsx(
                  classes.item,
                  PathConstant.MY_COMPANY_DASHBOARD === value && classes.checked
                )}
                variant="body2"
              >
                My Company
              </AppLink>
            </>
          )}
          <AppLink
            href={PathConstant.PROFILES_DASHBOARD}
            className={clsx(
              classes.item,
              PathConstant.PROFILES_DASHBOARD === value && classes.checked
            )}
            variant="body2"
          >
            My Profiles
          </AppLink>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SideBar;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    position: "fixed",
    top: 80,
    left: 0,
    width: 300,
    background: "#1e1f21",
    height: "100%",
  },
  header: {
    alignItems: "center",
    borderBottom: `1px solid #454545`,
    padding: theme.spacing(3),
  },
  imageUser: {
    width: 120,
    height: 120,
    objectFit: "cover",
    borderRadius: "50%",
    overflow: "hidden",
    backgroundColor: theme.palette.common.white,
  },
  item: {
    color: theme.palette.common.white,
    padding: theme.spacing(1.5, 3),
  },
  checked: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4,
  },
}));
