import { Box, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ImageConstant, PathConstant } from "const";
import { ThemeProps } from "models/types";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { AppImage, AppLink, AppTypography } from "components/common";
import clsx from "clsx";

const SideBar = () => {
  const classes = useStyles();
  const router = useRouter();

  const value = useMemo(() => {
    switch (router.pathname) {
      case PathConstant.DASHBOARD:
        return PathConstant.DASHBOARD;
      case PathConstant.MY_JOB_DASHBOARD:
        return PathConstant.MY_JOB_DASHBOARD;
      case PathConstant.PACKAGES_DASHBOARD:
        return PathConstant.PACKAGES_DASHBOARD;
      case PathConstant.MY_COMPANY_DASHBOARD:
        return PathConstant.MY_COMPANY_DASHBOARD;
      default:
        return false;
    }
  }, [router.pathname]);

  return (
    <Box className={classes.root}>
      <Stack spacing={2} className={classes.header}>
        <AppImage
          className={classes.imageUser}
          src={ImageConstant.AvatarDefault}
          imageProps={{ objectFit: "cover" }}
        />
        <AppTypography color="common.white" variant="subtitle1">
          Employer
        </AppTypography>
      </Stack>
      <Stack sx={{ p: 2 }}>
        <AppTypography className={classes.item} variant="subtitle1">
          Main
        </AppTypography>
        <Stack>
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
          <AppLink
            href={PathConstant.PACKAGES_DASHBOARD}
            className={clsx(
              classes.item,
              PathConstant.PACKAGES_DASHBOARD === value && classes.checked
            )}
            variant="body2"
          >
            Packages
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
