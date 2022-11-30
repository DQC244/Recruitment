import { CommonModal } from "components/common";
import { CommonModalProps } from "models/types";
import React from "react";
import { useTranslation } from "react-i18next";
import LoginForm from "./LoginForm";

const LoginModal = ({ onClose, ...otherProps }: CommonModalProps) => {
  const { t: getLabel } = useTranslation();
  return (
    <CommonModal
      hasCloseIcon
      modalTitleProps={{
        title: getLabel("lSignIn"),
      }}
      onClose={onClose}
      modalContentProps={{
        content: <LoginForm onClose={onClose} />,
      }}
      {...otherProps}
    />
  );
};

export default LoginModal;
