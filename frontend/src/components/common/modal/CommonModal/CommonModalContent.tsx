import React, { memo, ReactNode } from "react";
import { ThemeProps } from "models/types";
import { makeStyles } from "@mui/styles";
import { DialogContent, DialogContentProps } from "@mui/material";
import clsx from "clsx";

const CommonModalContent = ({
  children,
  className,
  ...otherProps
}: CommonModalContentProps) => {
  const classes = useStyles();

  return (
    <DialogContent className={clsx(classes.root, className)} {...otherProps}>
      {children}
    </DialogContent>
  );
};

type CommonModalContentProps = DialogContentProps & {
  children?: ReactNode;
  className?: string;
};

export default memo(CommonModalContent);

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    padding: theme.spacing(0, 5, 4),

    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 2, 1),
    },
  },
}));
