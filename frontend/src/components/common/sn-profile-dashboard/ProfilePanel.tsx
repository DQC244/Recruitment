import { Alert, Button, Snackbar, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppConstant } from "const";
import { useAuthContext } from "context";
import { useHandleUploadFile } from "hooks";
import { AccountClass } from "models";
import { ThemeProps } from "models/types";
import React, { ChangeEvent, useEffect, useState } from "react";
import AppInput from "../AppInput";
import AppTypography from "../AppTypography";
import UploadImageInput from "../UploadImageInput";
import { useUpdateUser } from "./hooks";
import ModalChangePassWord from "./ModalChangePassWord";

const ProfilePanel = () => {
  const classes = useStyles();
  const { accountInfo } = useAuthContext();
  const handleUpdateUserService = useUpdateUser();
  const handleUploadFile = useHandleUploadFile();

  const [account, setAccount] = useState<AccountClass>({} as AccountClass);

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMsg, setIsOpenMsg] = useState(false);
  const [error, setError] = useState("");
  const [localImage, setLocalImage] = useState<File>();

  const handelChangeImage = (file: File) => {
    setLocalImage(file);
  };

  const handleChangeInfo =
    (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setAccount({
        ...account,
        [key]: event.currentTarget.value,
      });
    };

  const handleUpdateUser = async () => {
    setIsLoading(true);
    let newImage;
    try {
      if (localImage) {
        newImage = await handleUploadFile(localImage);
      }
      const { message } = await handleUpdateUserService({
        id: account._id,
        name: account.name,
        image: (newImage as string) || account.image,
        phone: account.phone,
        email: account.email,
        permission: account.permission,
      });

      setError(message);
      setIsOpenMsg(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Object.values(accountInfo).length) {
      setAccount(accountInfo);
    }
  }, [accountInfo]);

  return (
    <Stack className={classes.root} flex={1} spacing={2}>
      <UploadImageInput
        onChangeImage={handelChangeImage}
        value={account.image}
      />

      <Stack direction="row" spacing={3}>
        <Stack flex={1} spacing={1}>
          <AppInput
            label="User Name"
            fullWidth
            value={account.name || ""}
            onChange={handleChangeInfo("name")}
          />
          <AppInput
            label="Email"
            fullWidth
            InputProps={{
              inputProps:{
                readOnly:true
              }
            }}
            value={account.email || ""}
            onChange={handleChangeInfo("email")}
          />
          <AppInput
            label="Phone"
            fullWidth
            value={account.phone || ""}
            onChange={handleChangeInfo("phone")}
          />
          {account.permission !== 0 && (
            <Stack direction="row" spacing={2}>
              <Button
                variant={
                  AppConstant.USER_TYPE.candidate === account.permission
                    ? "contained"
                    : "outlined"
                }
                onClick={() =>
                  setAccount({
                    ...account,
                    permission: AppConstant.USER_TYPE.candidate,
                  })
                }
              >
                <AppTypography>Candidate</AppTypography>
              </Button>
              <Button
                variant={
                  AppConstant.USER_TYPE.employer === account.permission
                    ? "contained"
                    : "outlined"
                }
                onClick={() =>
                  setAccount({
                    ...account,
                    permission: AppConstant.USER_TYPE.employer,
                  })
                }
              >
                <AppTypography>Employer</AppTypography>
              </Button>
            </Stack>
          )}
        </Stack>
      </Stack>
      <Button
        variant="contained"
        onClick={handleUpdateUser}
        disabled={isLoading}
      >
        Save Change
      </Button>
      <AppTypography onClick={() => setIsOpen(true)} className={classes.change}>
        Change Password
      </AppTypography>

      <ModalChangePassWord open={isOpen} onClose={() => setIsOpen(false)} />
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
