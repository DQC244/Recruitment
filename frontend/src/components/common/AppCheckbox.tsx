import React, { Fragment, memo } from "react";
import { ThemeProps } from "models/types";
import { makeStyles } from "@mui/styles";
import { Checkbox, CheckboxProps } from "@mui/material";
import { CheckboxIcon } from "components/icons";
import clsx from "clsx";

const AppCheckbox = ({
  classes,
  checkedIconProps = {},
  ...otherProps
}: AppCheckboxProps) => {
  const defaultClasses = useStyles();
  const { className: checkedIconClassName, ...otherCheckedIconProps } =
    checkedIconProps;

  return (
    <Checkbox
      classes={{
        ...classes,
        root: clsx(defaultClasses.root, classes?.root),
        checked: clsx(defaultClasses.checked, classes?.checked),
        disabled: clsx(defaultClasses.disabled, classes?.disabled),
      }}
      icon={<Fragment />}
      checkedIcon={
        <CheckboxIcon
          className={clsx(defaultClasses.checkedIcon, checkedIconClassName)}
          {...otherCheckedIconProps}
        />
      }
      {...otherProps}
    />
  );
};

type AppCheckboxProps = CheckboxProps & {
  checkedIconProps?: {
    className?: string;
  };
};

export default memo(AppCheckbox);

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    width: 24,
    height: 24,
    padding: 0,
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: 4,
  },
  checked: {
    "&,&:hover": {
      border: "unset",
      background: theme.palette.primary.main,
    },
  },
  disabled: {
    "&$checked": {
      background: theme.palette.gradient.disable,
    },
  },
  checkedIcon: {
    color: "transparent",
    fontSize: 20,
    stroke: theme.palette.common.white,
  },
}));
