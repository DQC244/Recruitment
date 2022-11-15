import React, { useEffect, useState } from "react";
import { Box, BoxProps, Button, ButtonProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppTypography } from "components/common";
import FilterLayout, { FilterLayoutProps } from "./FilterLayout";
import clsx from "clsx";
import { ThemeProps } from "models/types";

const FiltersBox = ({
  data,
  onChange,
  listProps = {},
  buttonProps = {},
  ...otherProps
}: FiltersBoxProps) => {
  const defaultClasses = useStyles();

  const { className: buttonClassName, ...otherButtonProps } = buttonProps;
  const { className: listClassName, ...otherListProps } = listProps;

  const [filters, setFilters] = useState(data);

  const onChangeFilters = (value?: number) => {
    const newFilters = filters?.map((item) =>
      item.value === value ? { ...item, checked: !item.checked } : item
    );
    setFilters(newFilters);

    if (onChange instanceof Function) {
      onChange(newFilters);
    }
  };

  useEffect(() => {
    if (Array.isArray(data)) {
      setFilters(data);
    }
  }, [data]);

  return (
    <FilterLayout {...otherProps}>
      <Box
        className={clsx(defaultClasses.list, listClassName)}
        {...otherListProps}
      >
        {filters?.map(({ value, label, checked }) => (
          <Button
            key={label}
            variant="outlined"
            onClick={() => onChangeFilters(value)}
            className={clsx(
              defaultClasses.button,
              buttonClassName,
              checked && defaultClasses.checked
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
  data?: {
    value?: number;
    label?: string;
    checked?: boolean;
  }[];
  buttonProps?: ButtonProps;
  listProps?: BoxProps;

  onChange: (value?: any) => void;
};

export default FiltersBox;

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
