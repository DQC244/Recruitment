import React from "react";
import { AppTypographyProps, ThemeProps } from "models/types";
import {
  Accordion,
  AccordionDetails,
  AccordionDetailsProps,
  AccordionProps,
  AccordionSummary,
  AccordionSummaryProps,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ArrowIcon } from "components/icons";
import { AppTypography } from "components/common";
import clsx from "clsx";

const AppAccordion = ({
  classes,
  accordionSummaryProps = {},
  accordionDetailsProps = {},
  labelProps = {},
  children,
  ...otherProps
}: AppAccordionProps) => {
  const defaultClasses = useStyles();

  const { classes: accordionSummaryClasses, ...otherAccordionSummaryProps } =
    accordionSummaryProps;
  const { classes: accordionDetailsClasses, ...otherAccordionDetailsProps } =
    accordionDetailsProps;
  const { label, ...otherLabelProps } = labelProps;

  return (
    <Accordion
      classes={{
        ...classes,
        root: clsx(defaultClasses.accordionRoot, classes?.root),
        expanded: clsx(defaultClasses.accordionExpanded, classes?.expanded),
      }}
      {...otherProps}
    >
      <AccordionSummary
        classes={{
          ...accordionSummaryClasses,
          root: clsx(
            defaultClasses.accordionSummaryRoot,
            accordionSummaryClasses?.root
          ),
          expanded: clsx(
            defaultClasses.accordionSummaryExpanded,
            accordionSummaryClasses?.expanded
          ),
          content: clsx(
            defaultClasses.accordionSummaryContent,
            accordionSummaryClasses?.content
          ),
          expandIconWrapper: clsx(
            defaultClasses.accordionSummaryExpandIconWrapper,
            accordionSummaryClasses?.expandIconWrapper
          ),
        }}
        expandIcon={<ArrowIcon />}
        {...otherAccordionSummaryProps}
      >
        <AppTypography
          responsiveVariant={{ xs: "subtitle2", sm: "subtitle1" }}
          {...otherLabelProps}
        >
          {label}
        </AppTypography>
      </AccordionSummary>
      <AccordionDetails
        classes={{
          ...accordionDetailsClasses,
          root: clsx(
            defaultClasses.accordionDetailsRoot,
            accordionDetailsClasses?.root
          ),
        }}
        {...otherAccordionDetailsProps}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

type AppAccordionProps = AccordionProps & {
  accordionSummaryProps?: AccordionSummaryProps;
  accordionDetailsProps?: AccordionDetailsProps;
  labelProps: AppTypographyProps & {
    label?: string;
  };
};

export default AppAccordion;

const useStyles = makeStyles((theme: ThemeProps) => ({
  accordionRoot: {
    "&$accordionRoot": {
      backgroundColor: "transparent",
      border: "unset",
      boxShadow: "unset",
      "&:before": {
        display: "none",
      },
    },
  },
  accordionExpanded: {
    "&$accordionExpanded": {
      minHeight: "unset",
    },
  },
  accordionSummaryRoot: {
    minHeight: "unset",
    padding: 0,
  },
  accordionSummaryExpanded: {
    "&$accordionSummaryExpanded": {
      minHeight: "unset",
      margin: 0,
    },
  },
  accordionSummaryContent: {
    "&$accordionSummaryContent": {
      margin: 0,
    },
  },
  accordionSummaryExpandIconWrapper: {
    stroke: theme.palette.common.black,
    fontSize: 32,
  },
  accordionDetailsRoot: {
    borderTop: `1px solid ${theme.palette.grey[200]}`,
    padding: theme.spacing(2, 0, 3),
  },
}));
