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

const MLHeader = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

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
          <Button endIcon={<PlusIcon />} variant="contained">
            {getLabel("lPostJob")}
          </Button>
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
