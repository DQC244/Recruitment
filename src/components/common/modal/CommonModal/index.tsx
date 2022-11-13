import React, { memo, Fragment } from "react";
import { CommonModalProps, ThemeProps } from "models/types";
import { makeStyles } from "@mui/styles";
import { CloseIcon } from "components/icons";
import { Dialog, IconButton } from "@mui/material";
import CommonModalTitle from "./CommonModalTitle";
import CommonModalContent from "./CommonModalContent";
import CommonModalActions from "./CommonModalActions";
import clsx from "clsx";

const CommonModal = ({
  classes = {},
  hasCloseIcon,
  modalTitle,
  modalContent,
  modalActions,
  actions,
  onClose,
  modalTitleProps = {},
  modalContentProps = {},
  modalActionsProps = {},
  closeIconProps = {},
  ...otherProps
}: CommonModalProps) => {
  const defaultClasses = useStyles();

  const { content, ...otherModalContentProps } = modalContentProps;
  const { title, ...otherModalTitleProps } = modalTitleProps;
  const { children: dialogActionsChildren, ...otherDialogActionsProps } = modalActionsProps;
  const { className: closeIconClassName, ...otherCloseIconProps } = closeIconProps;

  return (
    <Dialog
      scroll="paper"
      classes={{ ...classes, paper: clsx(defaultClasses.paper, classes.paper) }}
      {...otherProps}
    >
      {hasCloseIcon && (
        <IconButton
          onClick={onClose}
          className={clsx(defaultClasses.closeIconButton, closeIconClassName)}
          {...otherCloseIconProps}
        >
          <CloseIcon />
        </IconButton>
      )}

      {modalTitle ?? <CommonModalTitle {...otherModalTitleProps}>{title}</CommonModalTitle>}

      {modalContent ?? (
        <CommonModalContent {...otherModalContentProps}>{content}</CommonModalContent>
      )}

      {modalActions ??
        (actions || dialogActionsChildren ? (
          <CommonModalActions {...otherDialogActionsProps}>
            {actions || dialogActionsChildren}
          </CommonModalActions>
        ) : (
          <Fragment />
        ))}
    </Dialog>
  );
};

export default memo(CommonModal);

const useStyles = makeStyles((theme: ThemeProps) => ({
  paper: {
    position: "relative",
    width: 536,
    maxWidth: "100%",
    background: "#1E2126",
    border: "1px solid rgba(255, 255, 255, 0.16)",
    borderRadius: 16,
    boxShadow: "none",
  },
  closeIconButton: {
    position: "absolute",
    right: 24,
    top: 16,
    width: 24,
    height: 24,
    fontSize: 24,
    padding: 0,
    background: "unset",
    "&:hover": {
      background: "unset",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: 18,
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
  },
}));
