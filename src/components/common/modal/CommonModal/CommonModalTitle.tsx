import React, { memo, ReactNode } from "react";
import { makeStyles } from "@mui/styles";
import { AppTypography } from "components/common";
import { AppTypographyProps, ThemeProps } from "models/types";
import clsx from "clsx";

const CommonModalTitle = ({ children, className, ...otherProps }: CommonModalTitleProps) => {
  const classes = useStyles();

  return (
    <AppTypography
      responsiveVariant={{ xs: "subtitle1", sm: "h4" }}
      className={clsx(classes.root, className)}
      {...otherProps}
    >
      {children}
    </AppTypography>
  );
};

export default memo(CommonModalTitle);

type CommonModalTitleProps = AppTypographyProps & {
  children?: ReactNode;
  className?: string;
};

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    textAlign: "center",
    padding: theme.spacing(3, 2, 2),
  },
}));
