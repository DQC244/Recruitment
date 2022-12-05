import { Alert, Box, Button, Snackbar, Stack } from "@mui/material";
import { CommonModalProps } from "models/types";
import React, { useState } from "react";
import PasswordInput from "../PasswordInput";
import AppTypography from "../AppTypography";
import { CommonModal } from "../modal";
import { useChangePassword } from "./hooks";

const ModalChangePassWord = ({ onClose, ...otherProps }: CommonModalProps) => {
  const handleChangePasswordServices = useChangePassword();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [isOpenMsg, setIsOpenMsg] = useState(false);
  const [error, setError] = useState("");

  const isDisabledButton = !password || !newPassword || !confirmPassword;

  const handleClearData = () => {
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrorConfirmPassword("");
    setError("");
  };

  const handleChangePassword = async () => {
    if (confirmPassword !== newPassword) {
      setErrorConfirmPassword("Password not match");
      return;
    }
    const { isSuccess, message } = await handleChangePasswordServices({
      password,
      newPassword,
    });
    if (isSuccess) {
      setTimeout(() => {
        handleClearData();
        onClose();
      }, 2000);
    }
    setError(message);

    setIsOpenMsg(true);
  };

  return (
    <>
      <CommonModal
        hasCloseIcon
        modalTitleProps={{
          title: "Change Password",
        }}
        modalContent={
          <Stack width="100%" p={3} spacing={2}>
            <Box>
              <AppTypography>Current Password</AppTypography>
              <PasswordInput
                fullWidth
                value={password}
                onChangeValue={setPassword}
              />
            </Box>
            <Box>
              <AppTypography>New Password</AppTypography>
              <PasswordInput
                fullWidth
                value={newPassword}
                onChangeValue={setNewPassword}
              />
            </Box>
            <Box>
              <AppTypography>Confirm Password</AppTypography>
              <PasswordInput
                value={confirmPassword}
                fullWidth
                onChangeValue={setConfirmPassword}
                error={Boolean(errorConfirmPassword)}
                helperText={errorConfirmPassword}
              />
            </Box>
            <Button
              variant="contained"
              disabled={isDisabledButton}
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
          </Stack>
        }
        onClose={onClose}
        {...otherProps}
      />
      <Snackbar
        open={isOpenMsg}
        autoHideDuration={5000}
        onClose={() => setIsOpenMsg(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setIsOpenMsg(false)}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error || "success!"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ModalChangePassWord;
