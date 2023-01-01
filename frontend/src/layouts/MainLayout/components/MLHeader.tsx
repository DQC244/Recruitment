import React from "react";
import { AppBar, Box, Button, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { ThemeProps } from "models/types";
import HeaderTabs from "./HeaderTabs";
import { AppLink } from "components/common";
import { useTranslation } from "react-i18next";
import Account from "./Account";
import { PlusIcon } from "components/icons";
import { AppConstant, PathConstant } from "const";
import { useAuthContext } from "context";
import { useRouter } from "next/router";

const MLHeader = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const router = useRouter();

  const { hasAccount, accountInfo, setIsOpen } = useAuthContext();

  const handleCreateCV = () => {
    if (hasAccount) {
      router.push(PathConstant.CREATE_CV);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <AppBar className={classes.appBar}>
      <Container
        classes={{ root: clsx("space-between-root", classes.container) }}
      >
        <AppLink
          className={classes.logo}
          href="/"
          color="primary.main"
          variant="h3"
        >
          DQC
        </AppLink>
        <HeaderTabs />
        <Box display="flex">
          <Account className={classes.account} />
          {accountInfo.permission === AppConstant.USER_TYPE.employer && (
            <Button
              href={PathConstant.CREATE_JOBS}
              endIcon={<PlusIcon />}
              variant="contained"
            >
              {getLabel("lPostJob")}
            </Button>
          )}
          {![
            AppConstant.USER_TYPE.admin,
            AppConstant.USER_TYPE.employer,
          ].includes(accountInfo.permission) && (
            <Button variant="contained" onClick={handleCreateCV}>
              Create your CV
            </Button>
          )}
        </Box>
      </Container>
    </AppBar>
  );
};

export default MLHeader;
export const HEADER_HEIGHT_IN_PX = 80;

const useStyles = makeStyles((theme: ThemeProps) => ({
  appBar: {
    position: "fixed",
    height: HEADER_HEIGHT_IN_PX,
    backgroundColor: theme.palette.common.white,
  },
  container: {
    height: HEADER_HEIGHT_IN_PX,
  },
  account: {
    marginRight: theme.spacing(2),
  },
  logo: {
    "&:hover": {
      textDecoration: "none",
    },
  },
}));
