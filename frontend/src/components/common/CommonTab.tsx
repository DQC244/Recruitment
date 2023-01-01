import React, { memo } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Tab, TabProps } from "@mui/material";
import { ThemeProps } from "models/types";
import AppLink, { AppLinkProps } from "./AppLink";
import clsx from "clsx";

const CommonTab = ({ label, classes, ...otherProps }: CommonTabProps) => {
  const defaultClasses = useStyles();

  return (
    <Tab
      component={AppLink}
      label={label}
      classes={{
        ...classes,
        root: clsx(defaultClasses.tabRoot, classes?.root),
        selected: clsx(defaultClasses.selected, classes?.selected),
      }}
      disableRipple
      disableFocusRipple
      {...otherProps}
    />
  );
};

type CommonTabProps = AppLinkProps & TabProps;

export default memo(CommonTab);

const useStyles = makeStyles((theme: ThemeProps) => ({
  tabRoot: {
    color: theme.palette.common.black,
    padding: 0,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  selected: {
    "&$selected": {
      color: theme.palette.primary.main,
    },
  },
}));
