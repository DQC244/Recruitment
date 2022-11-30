import { Box, Button, Stack } from "@mui/material";
import { CommonModalProps } from "models/types";
import React from "react";
import AppInput from "../AppInput";
import AppTypography from "../AppTypography";
import { CommonModal } from "../modal";

const ModalChangePassWord = (props: CommonModalProps) => {
  return (
    <CommonModal
      hasCloseIcon
      modalTitleProps={{
        title: "Change Password",
      }}
      modalContent={
        <Stack width="100%" p={3} spacing={2}>
          <Box>
            <AppTypography>Current Password</AppTypography>
            <AppInput fullWidth />
          </Box>
          <Box>
            <AppTypography>New Password</AppTypography>
            <AppInput fullWidth />
          </Box>
          <Box>
            <AppTypography>Confirm Password</AppTypography>
            <AppInput fullWidth />
          </Box>
          <Button variant="contained">Change Password</Button>
        </Stack>
      }
      {...props}
    />
  );
};

export default ModalChangePassWord;
