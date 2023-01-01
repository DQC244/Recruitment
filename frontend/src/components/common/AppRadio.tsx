import React, { memo } from "react";
import { ThemeProps } from "models/types";
import { makeStyles } from "@mui/styles";
import { Box, Radio, RadioProps } from "@mui/material";
import { RadioIcon } from "components/icons";
import clsx from "clsx";

const AppRadio = ({
  classes,
  iconProps = {},
  ...otherProps
}: AppRadioProps) => {
  const defaultClasses = useStyles();

  const { checkedIconClassName, iconClassName } = iconProps;

  return (
    <Radio
      classes={{
        ...classes,
        root: clsx(defaultClasses.root, classes?.root),
        checked: clsx(defaultClasses.checked, classes?.checked),
      }}
      {...otherProps}
      checkedIcon={
        <RadioIcon
          className={clsx(defaultClasses.iconChecked, checkedIconClassName)}
        />
      }
      icon={<Box className={clsx(defaultClasses.icon, iconClassName)} />}
    />
  );
};

type AppRadioProps = RadioProps & {
  iconProps?: {
    iconClassName?: string;
    checkedIconClassName?: string;
  };
};

export default memo(AppRadio);

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    width: 32,
    height: 32,
    padding: 0,
    background: "rgba(255, 255, 255, 0.08)",
  },
  checked: {
    background: "unset",
  },
  iconChecked: {
    fontSize: 24,
    color: theme.palette.primary.light,
  },
  icon: {
    width: 24,
    height: 24,
    border: `2px solid ${theme.palette.grey[500]}`,
    borderRadius: "50%",
  },
}));
