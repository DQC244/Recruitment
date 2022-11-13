import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { TabClasses, TabsClasses } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ObjectMultiLanguageProps, ThemeProps } from "models/types";
import { CommonTab, CommonTabs } from "components/common";
import { PathConstant } from "const";
import { useRouter } from "next/router";

const HeaderTabs = () => {
  const classes = useStyles();
  const router = useRouter();
  const { t: getLabel } = useTranslation();

  const headerTab = useMemo(() => getHeaderTabArr(getLabel), [getLabel]);

  // TODO:update when have srs
  const getRouterValue = (pathname: string) => {
    switch (pathname) {
      case PathConstant.ROOT:
        return PathConstant.ROOT;
      case PathConstant.COMPANY:
        return PathConstant.COMPANY;
      case PathConstant.JOB:
        return PathConstant.JOB;
      case PathConstant.PAGES:
        return PathConstant.PAGES;
      case PathConstant.BLOG:
        return PathConstant.BLOG;
      default:
        return "";
    }
  };

  const tabValue = useMemo(
    () => getRouterValue(router.pathname),
    [router.pathname]
  );

  return (
    <CommonTabs
      classes={
        {
          root: classes.tabsRoot,
          flexContainer: classes.flexContainer,
        } as TabsClasses
      }
      value={tabValue}
    >
      {headerTab.map((item, index) => (
        <CommonTab
          key={index}
          label={item.label}
          value={item.path}
          href={item.path}
          classes={
            {
              root: classes.tabRoot,
            } as TabClasses
          }
        />
      ))}
    </CommonTabs>
  );
};

export default HeaderTabs;

const getHeaderTabArr = (
  getLabel: (string: string, object: object) => ObjectMultiLanguageProps
) => {
  const objTabs = getLabel("objHeaderTab", {
    returnObjects: true,
  });
  return [
    { label: objTabs.lHome, path: PathConstant.ROOT },
    { label: objTabs.lJobs, path: PathConstant.JOB },
    { label: objTabs.lCompanies, path: PathConstant.COMPANY },
    { label: objTabs.lPages, path: PathConstant.PAGES },
    { label: objTabs.lBlogs, path: PathConstant.BLOG },
  ];
};

const useStyles = makeStyles((theme: ThemeProps) => ({
  tabsRoot: {
    minHeight: "unset",
  },
  tabRoot: {
    ...theme.typography?.subtitle1,
    minWidth: "unset",
    minHeight: "unset",
    padding: 0,
    margin: theme.spacing(0, 2.5),
    textTransform: "capitalize",
    "&:hover": {
      textDecoration: "unset",
    },
    "&:last-child": {
      marginRight: 0,
    },

    [theme.breakpoints.down("lg")]: {
      margin: theme.spacing(3, 0, 0),
      fontSize: 24,
      "&:first-child": {
        margin: 0,
      },
    },
  },
  flexContainer: {
    [theme.breakpoints.down("lg")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
}));
