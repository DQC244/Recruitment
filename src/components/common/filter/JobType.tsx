import React, { memo, useEffect, useState } from "react";
import { Box, BoxProps, Button, ButtonProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppTypography } from "components/common";
import FilterLayout, { FilterLayoutProps } from "./FilterLayout";
import clsx from "clsx";
import { ThemeProps } from "models/types";
import { AppConstant } from "const";

const JobType = ({
  data,
  onChange,
  listProps = {},
  buttonProps = {},
  ...otherProps
}: FiltersBoxProps) => {
  const defaultClasses = useStyles();

  const { className: buttonClassName, ...otherButtonProps } = buttonProps;
  const { className: listClassName, ...otherListProps } = listProps;

  const [filters, setFilters] = useState<number[]>([]);

  const onChangeFilters = (value: number) => {
    let newFilter = [...filters];
    let index = newFilter.indexOf(value);
    if (index !== -1) {
      newFilter.splice(index, 1);
    } else {
      newFilter = [...newFilter, value];
    }

    setFilters(newFilter);
    onChange(newFilter);
  };

  useEffect(() => {
    if (Array.isArray(data)) {
      setFilters(data);
    }
  }, [data]);

  return (
    <FilterLayout title="Job Type" {...otherProps}>
      <Box
        className={clsx(defaultClasses.list, listClassName)}
        {...otherListProps}
      >
        {defaultFilters.map(({ value, label }) => (
          <Button
            key={label}
            variant="outlined"
            onClick={() => onChangeFilters(value)}
            className={clsx(
              defaultClasses.button,
              buttonClassName,
              filters.includes(value) && defaultClasses.checked
            )}
            {...otherButtonProps}
          >
            <AppTypography variant="body2">{label}</AppTypography>
          </Button>
        ))}
      </Box>
    </FilterLayout>
  );
};

export type FiltersBoxProps = FilterLayoutProps & {
  data?: number[];
  buttonProps?: ButtonProps;
  listProps?: BoxProps;

  onChange: (value?: any) => void;
};

export default memo(JobType);

const defaultFilters = [
  {
    value: AppConstant.JOB_TYPE.freelance,
    label: "Freelance",
  },
  {
    value: AppConstant.JOB_TYPE.fulltime,
    label: "Fulltime",
  },
  {
    value: AppConstant.JOB_TYPE.partTime,
    label: "Part Time",
  },
  {
    value: AppConstant.JOB_TYPE.internship,
    label: "Internship",
  },
  {
    value: AppConstant.JOB_TYPE.temporary,
    label: "Temporary",
  },
];

const useStyles = makeStyles((theme: ThemeProps) => ({
  list: {
    maxWidth: 240,
  },
  button: {
    minHeight: "unset",
    minWidth: "unset",
    padding: theme.spacing(0.5, 1.75),
    borderRadius: 4,
    border: `1px solid ${theme.palette.grey[300]}`,
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    "&:hover": {
      backgroundColor: "inherit",
    },
    "&:last-child": {
      margin: 0,
    },
  },
  checked: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  },
}));
