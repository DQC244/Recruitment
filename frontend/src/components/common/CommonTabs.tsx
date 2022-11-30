import React, { memo } from "react";
import { Tabs, TabsProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

const CommonTabs = ({ children, classes, ...otherProps }: CommonTabsProps) => {
  const defaultClasses = useStyles();

  return (
    <Tabs
      classes={{
        ...classes,
        root: clsx(defaultClasses.tabs, classes?.root),
        flexContainer: clsx(
          defaultClasses.flexContainer,
          classes?.flexContainer
        ),
        indicator: clsx(defaultClasses.indicator, classes?.indicator),
      }}
      {...otherProps}
    >
      {children}
    </Tabs>
  );
};

type CommonTabsProps = TabsProps;

export default memo(CommonTabs);

const useStyles = makeStyles({
  tabs: {
    display: "flex",
  },
  flexContainer: {
    height: "100%",
  },
  indicator: {
    display: "none",
  },
});
