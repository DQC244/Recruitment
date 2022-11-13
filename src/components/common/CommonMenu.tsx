import React, { memo, ReactNode } from "react";
import { MenuItem, MenuItemProps, Popper, PopperProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import clsx from "clsx";

const CommonMenu = ({
  data,
  className,
  onClickItem,
  menuItemProps = {},
  ...otherProps
}: CommonMenuProp) => {
  const defaultClasses = useStyles();

  const { classes: menuItemClasses, ...otherMenuItemProps } = menuItemProps;

  return (
    <Popper className={clsx(defaultClasses.popper, className)} {...otherProps}>
      {data.map((item, index) => (
        <MenuItem
          classes={{
            ...menuItemClasses,
            root: clsx(defaultClasses.itemRoot, menuItemClasses?.root),
          }}
          key={index}
          onClick={() => onClickItem(item)}
          {...otherMenuItemProps}
        >
          {item.label}
        </MenuItem>
      ))}
    </Popper>
  );
};

type dataItem = {
  label: ReactNode;
  value?: string | number;
};

type CommonMenuProp = PopperProps & {
  data: dataItem[];
  onClickItem: (item: dataItem) => void;
  menuItemProps?: MenuItemProps;
};

export default memo(CommonMenu);

const useStyles = makeStyles((theme: ThemeProps) => ({
  popper: {
    padding: 0,
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: 4,
    zIndex: 1101,
    overflow: "hidden",
  },
  itemRoot: {
    minWidth: 146,
    padding: theme.spacing(0.75, 2),
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    "&:last-child": {
      border: "unset",
    },
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  },
}));
