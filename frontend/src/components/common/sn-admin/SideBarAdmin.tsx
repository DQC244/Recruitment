import { Box, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PathConstant } from "const";
import { ThemeProps } from "models/types";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { AppLink, AppTypography } from "components/common";
import clsx from "clsx";
import { useAuthContext } from "context";

const SideBarAdmin = () => {
  const classes = useStyles();
  const router = useRouter();

  const { accountInfo } = useAuthContext();

  const value = useMemo(() => {
    switch (router.pathname) {
      case PathConstant.ADMIN:
        return PathConstant.ADMIN;
      case PathConstant.ADMIN_COMPANY_DASHBOARD:
        return PathConstant.ADMIN_COMPANY_DASHBOARD;
      case PathConstant.ADMIN_PROFILE_DASHBOARD:
        return PathConstant.ADMIN_PROFILE_DASHBOARD;
      case PathConstant.ADMIN_CATEGORY_DASHBOARD:
        return PathConstant.ADMIN_CATEGORY_DASHBOARD;
      case PathConstant.ADMIN_PACKAGE_DASHBOARD:
        return PathConstant.ADMIN_PACKAGE_DASHBOARD;
      case PathConstant.ADMIN_USERS_DASHBOARD:
        return PathConstant.ADMIN_USERS_DASHBOARD;

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
          Admin
        </AppTypography>
      </Stack>
      <Stack sx={{ p: 2 }}>
        <AppTypography className={classes.item} variant="subtitle1">
          Main
        </AppTypography>
        <Stack>
          <AppLink
            href={PathConstant.ADMIN}
            className={clsx(
              classes.item,
              PathConstant.ADMIN === value && classes.checked
            )}
            variant="body2"
          >
            Dashboard
          </AppLink>
          <AppLink
            href={PathConstant.ADMIN_COMPANY_DASHBOARD}
            className={clsx(
              classes.item,
              PathConstant.ADMIN_COMPANY_DASHBOARD === value && classes.checked
            )}
            variant="body2"
          >
            Company List
          </AppLink>
          <AppLink
            href={PathConstant.ADMIN_CATEGORY_DASHBOARD}
            className={clsx(
              classes.item,
              PathConstant.ADMIN_CATEGORY_DASHBOARD === value && classes.checked
            )}
            variant="body2"
          >
            Category List
          </AppLink>
          <AppLink
            href={PathConstant.ADMIN_PACKAGE_DASHBOARD}
            className={clsx(
              classes.item,
              PathConstant.ADMIN_PACKAGE_DASHBOARD === value && classes.checked
            )}
            variant="body2"
          >
            Package List
          </AppLink>
          <AppLink
            href={PathConstant.ADMIN_USERS_DASHBOARD}
            className={clsx(
              classes.item,
              PathConstant.ADMIN_USERS_DASHBOARD === value && classes.checked
            )}
            variant="body2"
          >
            User List
          </AppLink>

          <AppLink
            href={PathConstant.ADMIN_PROFILE_DASHBOARD}
            className={clsx(
              classes.item,
              PathConstant.ADMIN_PROFILE_DASHBOARD === value && classes.checked
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

export default SideBarAdmin;

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
