import React from "react";
import { CommonModalProps } from "models/types";
import { Button, ButtonProps } from "@mui/material";
import { useGlobalModalContext } from "context/GlobalModalContext";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import CommonModal from "./CommonModal";
import clsx from "clsx";

const NoticeModal = ({
  labelAction,
  onSubmit,
  onClose,
  buttonProps = {},
  ...otherProps
}: ConfirmModalProps) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

  const { className: buttonClassName, ...otherButtonProps } = buttonProps;

  const { closeGlobalModal } = useGlobalModalContext();

  const handleCloseModal = onClose || closeGlobalModal;

  return (
    <CommonModal
      hasCloseIcon={true}
      modalActionsProps={{
        children: (
          <Button
            className={clsx(classes.button, buttonClassName)}
            variant="contained"
            onClick={onSubmit}
            {...otherButtonProps}
          >
            {labelAction || getLabel("lOk")}
          </Button>
        ),
      }}
      onClose={handleCloseModal}
      {...otherProps}
    />
  );
};

export type ConfirmModalProps = CommonModalProps & {
  labelAction: string;
  buttonProps?: ButtonProps;

  onSubmit: () => void;
};

export default NoticeModal;

const useStyles = makeStyles(() => ({
  button: {
    width: "100%",
  },
}));
