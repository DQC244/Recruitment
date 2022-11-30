import React, { memo } from "react";
import { ThemeProps } from "models/types";
import { makeStyles } from "@mui/styles";
import { DialogActions, DialogActionsProps } from "@mui/material";
import clsx from "clsx";

const CommonModalActions = ({ className, ...otherProps }: CommonModalActionsProps) => {
  const classes = useStyles();

  return <DialogActions className={clsx(classes.root, className)} {...otherProps} />;
};

type CommonModalActionsProps = DialogActionsProps & {
  className?: string;
};

export default memo(CommonModalActions);

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    justifyContent: "center",
    padding: theme.spacing(0, 5, 4),
  },
}));
