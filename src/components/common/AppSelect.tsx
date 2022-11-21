import React, {
  memo,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ThemeProps } from "models/types";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  ButtonProps,
  ClickAwayListener,
  MenuItem,
  MenuItemProps,
  Popper,
  PopperProps,
} from "@mui/material";
import { ArrowIcon } from "components/icons";
import clsx from "clsx";

const AppSelect = ({
  data,
  selectedIndex,
  defaultLabel,
  onSelected,
  buttonProps = {},
  popperProps = { open: false },
  menuItemProps = {},
  ...otherProps
}: AppSelectProps) => {
  const defaultClasses = useStyles();

  const { classes: buttonClasses, ...otherButtonProps } = buttonProps;
  const { className: popperClassName, ...otherPopperProps } = popperProps;
  const { classes: menuItemClasses, ...otherMenuItemProps } = menuItemProps;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectList, setSelectList] = useState<ItemSelect[]>([]);
  const [selectedItem, setSelectedItem] = useState<ItemSelect>();

  const handleOpenAppSelect = (event: MouseEvent<HTMLButtonElement>) => {
    const newAnchorEl = anchorEl ? null : event.currentTarget;
    setAnchorEl(newAnchorEl);
  };

  const handleCloseSelect = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleClickMenuItem = useCallback(
    (newSelectedItem: ItemSelect) => () => {
      setSelectedItem(newSelectedItem);
      onSelected(newSelectedItem);
      handleCloseSelect();
    },
    [onSelected]
  );

  useEffect(() => {
    if (Array.isArray(data)) {
      const selectedItemData = data.find(
        (item) => item.value === selectedIndex
      );
      setSelectedItem(selectedItemData);
      setSelectList(data);
    }
  }, [data, selectedIndex]);

  return (
    <ClickAwayListener onClickAway={handleCloseSelect}>
      <Box width="fit-content" {...otherProps}>
        <Button
          classes={{
            ...buttonClasses,
            root: clsx(defaultClasses.buttonRoot, buttonClasses?.root),
            endIcon: clsx(
              defaultClasses.endIcon,
              Boolean(anchorEl) && defaultClasses.endIconRotate,
              buttonClasses?.endIcon
            ),
          }}
          onClick={handleOpenAppSelect}
          endIcon={<ArrowIcon />}
          disableRipple
          disableFocusRipple
          {...otherButtonProps}
        >
          {defaultLabel || selectedItem?.label}
        </Button>
        <Popper
          className={clsx(defaultClasses.popper, popperClassName)}
          anchorEl={anchorEl}
          placement="bottom"
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 4],
              },
            },
          ]}
          {...otherPopperProps}
          open={Boolean(anchorEl)}
        >
          {selectList.map((item, index) => (
            <MenuItem
              key={index}
              value={item.value}
              classes={{
                ...menuItemClasses,
                root: clsx(
                  defaultClasses.menuItemRoot,
                  menuItemClasses?.root,
                  selectedItem?.value === item.value && defaultClasses.checked
                ),
              }}
              onClick={handleClickMenuItem(item)}
              {...otherMenuItemProps}
            >
              {item.label}
            </MenuItem>
          ))}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

type ItemSelect = {
  label: ReactNode;
  value: string | number;
};

type AppSelectProps = {
  data: ItemSelect[];
  selectedIndex: string | number;
  defaultLabel?: string;
  popperProps?: PopperProps;
  buttonProps?: ButtonProps;
  menuItemProps?: MenuItemProps;

  onSelected: (item: ItemSelect) => void;
};

export default memo(AppSelect);

const useStyles = makeStyles((theme: ThemeProps) => ({
  buttonRoot: {
    ...theme.typography?.subtitle1,
    minWidth: 200,
    height: 48,
    padding: theme.spacing(1.25, 2),
    justifyContent: "space-between",
    color: theme.palette.common.black,
    border: `1px solid ${theme.palette.grey[200]}`,
  },
  endIcon: {
    stroke: theme.palette.common.black,
    "&>*:nth-of-type(1)": {
      fontSize: 24,
    },
  },
  endIconRotate: {
    transform: "rotate(180deg)",
  },
  popper: {
    minWidth: 200,
    backgroundColor: "white",
    borderRadius: 8,
    border: "1px solid rgba(255, 255, 255, 0.08)",
    filter: "drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.4))",
    overflow: "hidden",
  },
  menuItemRoot: {
    padding: theme.spacing(0.75, 2),
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    "&:last-child": {
      border: "unset",
    },
  },
  checked: {
    "&,&:hover": {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
    },
  },
}));
