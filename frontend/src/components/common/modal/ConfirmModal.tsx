import React from "react";
import { CommonModalProps, ThemeProps } from "models/types";
import { Box, Button, ButtonProps } from "@mui/material";
import { useGlobalModalContext } from "context/GlobalModalContext";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import CommonModal from "./CommonModal";
import clsx from "clsx";

const ConfirmModal = ({
  labelCancel,
  labelConfirm,
  onCancel,
  onConfirm,
  onClose,
  cancelButtonProps = {},
  confirmButtonProps = {},
  ...otherProps
}: ConfirmModalProps) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

  const { className: cancelClassName, ...otherButtonCancelProps } =
    cancelButtonProps;
  const { className: confirmClassName, ...otherButtonConfirmProps } =
    confirmButtonProps;

  const { closeGlobalModal } = useGlobalModalContext();

  const handleCloseModal = onClose || closeGlobalModal;

  return (
    <CommonModal
      hasCloseIcon={true}
      modalActionsProps={{
        children: (
          <Box className={clsx("space-between-root", classes.actions)}>
            <Button
              className={clsx(classes.button, cancelClassName)}
              variant="outlined"
              onClick={onCancel}
              {...otherButtonCancelProps}
            >
              {labelCancel || getLabel("lCancel")}
            </Button>
            <Button
              className={clsx(classes.button, confirmClassName)}
              variant="contained"
              onClick={onConfirm}
              {...otherButtonConfirmProps}
            >
              {labelConfirm || getLabel("lConfirm")}
            </Button>
          </Box>
        ),
      }}
      onClose={handleCloseModal}
      {...otherProps}
    />
  );
};

export type ConfirmModalProps = CommonModalProps & {
  labelCancel: string;
  labelConfirm: string;
  cancelButtonProps?: ButtonProps;
  confirmButtonProps?: ButtonProps;

  onCancel: () => void;
  onConfirm: () => void;
};

export default ConfirmModal;

const useStyles = makeStyles((theme: ThemeProps) => ({
  actions: {
    width: "100%",
  },
  button: {
    flex: 1,
    "&:last-child": {
      marginLeft: theme.spacing(3),
    },
  },
}));
