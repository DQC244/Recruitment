import React, { memo } from "react";
import { Tooltip, TooltipProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { IProps, ThemeProps } from "models/types";
import clsx from "clsx";

const AppTooltip = ({ children, classes, ...otherProps }: AppToolTipProps) => {
  const defaultClasses = useStyles();

  return (
    <Tooltip
      placement="top"
      classes={{
        ...classes,
        tooltip: clsx(defaultClasses.tooltip, classes?.tooltip),
      }}
      {...otherProps}
    >
      {children}
    </Tooltip>
  );
};

type AppToolTipProps = IProps & TooltipProps;

export default memo(AppTooltip);

const useStyles = makeStyles((theme: ThemeProps) => ({
  tooltip: {
    padding: theme.spacing(0.5, 1),
    backgroundColor: "#1E2126",
    borderRadius: 4,
  },
}));
