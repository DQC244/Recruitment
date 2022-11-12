import React, { memo } from "react";
import { Box, NoSsr } from "@mui/material";
import { Theme } from "@mui/system";
import clsx from "clsx";
import { AppHead } from "components/common";
import { IProps } from "models";
import MLHeader, { HEADER_HEIGHT_IN_PX } from "./components/MLHeader";
import { makeStyles } from "@mui/styles";
import { useCalcSizeDevice } from "hooks";

const MainLayout = ({ className, children, ...otherProps }: MainLayoutProps): JSX.Element => {
  useCalcSizeDevice();
  const classesDefault = useStyles();

  return (
    <>
      <AppHead />
      <NoSsr>
        <MLHeader />
        <Box className={clsx(classesDefault.main, className)} {...otherProps}>
          {children}
        </Box>
      </NoSsr>
    </>
  );
};

type MainLayoutProps = IProps;

MainLayout.defaultProps = {};

export default memo(MainLayout);

export const MAIN_ID = "MAIN_ID";

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    position: "relative",
    width: "100vw",
    minHeight: `calc(100vh - ${HEADER_HEIGHT_IN_PX}px)`,
    marginTop: HEADER_HEIGHT_IN_PX,
    background: theme.palette.background.default,
    overflow: "hidden",
  },
}));
