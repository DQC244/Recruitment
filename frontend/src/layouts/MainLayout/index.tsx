import React, { memo, useEffect, useState } from "react";
import { Box, NoSsr } from "@mui/material";
import { Theme } from "@mui/system";
import clsx from "clsx";
import { AppHead } from "components/common";
import { IProps } from "models";
import MLHeader, { HEADER_HEIGHT_IN_PX } from "./components/MLHeader";
import { makeStyles } from "@mui/styles";
import { useCalcSizeDevice } from "hooks";
import Footer from "./components/Footer";
import { PathConstant } from "const";
import { useRouter } from "next/router";

const MainLayout = ({
  className,
  children,
  ...otherProps
}: MainLayoutProps): JSX.Element => {
  useCalcSizeDevice();
  const classesDefault = useStyles();
  const router = useRouter();
  const [title, setTitle] = useState("");

  const isDashboard = [
    PathConstant.DASHBOARD,
    PathConstant.MY_JOB_DASHBOARD,
    PathConstant.MY_COMPANY_DASHBOARD,
    PathConstant.PACKAGES_DASHBOARD,
    PathConstant.PROFILES_DASHBOARD,
  ].includes(router.pathname);

  useEffect(() => {
    if (isDashboard) {
      setTitle(titlePages[PathConstant.DASHBOARD]);
    } else {
      setTitle(titlePages[router.pathname]);
    }
  }, [router.pathname]);

  return (
    <>
      <AppHead title={title} />
      <NoSsr>
        <MLHeader />
        <Box className={clsx(classesDefault.main, className)} {...otherProps}>
          {children}
          {!isDashboard && <Footer />}
        </Box>
      </NoSsr>
    </>
  );
};

type MainLayoutProps = IProps;

MainLayout.defaultProps = {};

export default memo(MainLayout);

const titlePages = {
  [PathConstant.ROOT]: "DQC",
  [PathConstant.JOBS]: "Job list",
  [PathConstant.JOBS_DETAIL]: "Job detail",
  [PathConstant.CREATE_JOBS]: "Create job",
  [PathConstant.COMPANY]: "Company list",
  [PathConstant.COMPANY_DETAIL]: "Company detail",
  [PathConstant.CREATE_COMPANY]: "Create company",
  [PathConstant.DASHBOARD]: "Dashboard",
};

export const MAIN_ID = "MAIN_ID";

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    position: "relative",
    width: "100vw",
    minHeight: `calc(100vh - ${HEADER_HEIGHT_IN_PX}px)`,
    marginTop: HEADER_HEIGHT_IN_PX,
    background: "unset",
    overflow: "hidden",
  },
}));
