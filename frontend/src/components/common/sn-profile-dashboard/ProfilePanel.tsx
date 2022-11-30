import { Button, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import React, { useState } from "react";
import AppInput from "../AppInput";
import AppTypography from "../AppTypography";
import UploadImageInput from "../UploadImageInput";
import ModalChangePassWord from "./ModalChangePassWord";

const ProfilePanel = () => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  const handelChangeImage = () => {
    return;
  };

  return (
    <Stack className={classes.root} flex={1} spacing={2}>
      <UploadImageInput onChangeImage={handelChangeImage} />

      <Stack direction="row" spacing={3}>
        <Stack flex={1}>
          <AppTypography>First Name</AppTypography>
          <AppInput fullWidth />
          <AppTypography>Email</AppTypography>
          <AppInput fullWidth />
        </Stack>
        <Stack flex={1}>
          <AppTypography>Last Name</AppTypography>
          <AppInput fullWidth />
          <AppTypography>Phone</AppTypography>
          <AppInput fullWidth />
        </Stack>
      </Stack>
      <Button variant="contained">Save Change</Button>
      <AppTypography onClick={() => setIsOpen(true)} className={classes.change}>
        Change Password
      </AppTypography>
      <ModalChangePassWord open={isOpen} onClose={() => setIsOpen(false)} />
    </Stack>
  );
};

export default ProfilePanel;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    padding: theme.spacing(3),
    boxShadow: "0 0 15px rgb(0 0 0 / 10%)",
    width: "100%",
  },
  change: {
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
}));
