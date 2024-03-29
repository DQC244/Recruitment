import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Stack,
  Switch,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppInput, AppTypography, PasswordInput } from "components/common";
import { ApiConstant, AppConstant, PathConstant } from "const";
import { useAuthContext } from "context";
import { ThemeProps } from "models/types";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";
import { AccountService } from "services";
import { CommonUtils } from "utils";
import { useRegisterUser } from "./hooks";

const EmployerForm = (props: EmployerFormProps) => {
  const handleRegisterService = useRegisterUser();

  const { setIsOpen } = useAuthContext();

  const classes = useStyles();

  const router = useRouter();

  const [isAgree, setIsAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [errorEmailMsg, setErrorEmailMsg] = useState("");
  const [errorPhoneMsg, setErrorPhoneMsg] = useState("");
  const [isOpenMsg, setIsOpenMsg] = useState(false);
  const [code, setCode] = useState("");
  const [sentMail, setSentMail] = useState(false);
  const [userType, setUserType] = useState(AppConstant.USER_TYPE.candidate);

  const isDisabledButton =
    !userName ||
    !email ||
    !password ||
    !isAgree ||
    isLoading ||
    !phone ||
    Boolean(errorEmailMsg) ||
    Boolean(errorPhoneMsg);

  const handleAgree = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgree(event.target.checked);
  };

  const verifyCodeService = async () => {
    try {
      const res: any = await AccountService.verifyCode(email, code);
      if (res.status === ApiConstant.STT_OK) {
        setError("");
        setTimeout(() => {
          router.push(PathConstant.ROOT);

          setTimeout(() => {
            setIsOpen(true);
          }, 500);
          
        }, 1000);
      } else {
        setError(res.data.message);
      }
      setIsOpenMsg(true);
    } catch (error) {
      setError("something went wrong");
      setIsOpenMsg(true);
    }
  };

  const handleSendCode = () => {
    verifyCodeService();
  };

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (!CommonUtils.checkEmailFormat(value)) {
      setErrorEmailMsg("Email invalidate");
    } else {
      setErrorEmailMsg("");
    }
    setEmail(value);
  };

  const handleChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (!CommonUtils.checkValidPhoneNumber(value)) {
      setErrorPhoneMsg("Phone invalidate");
    } else {
      setErrorPhoneMsg("");
    }
    setPhone(value);
  };

  const handleRegister = async () => {
    setIsLoading(true);
    const { isSuccess, message } = await handleRegisterService({
      name: userName,
      phone,
      email,
      permission: userType,
      password,
    });

    if (isSuccess) {
      setSentMail(true);
    } else {
      setError(message);
      setIsOpenMsg(true);
    }
    setIsLoading(false);
  };

  return (
    <>
      {sentMail ? (
        <Stack spacing={3} alignItems="center">
          <AppTypography variant="h3" textAlign="center">
            We just sent a text message containing a 6-digit verification code
            to {email}
          </AppTypography>
          <AppInput
            InputProps={{
              inputProps: {
                textAlign: "center",
              },
            }}
            value={code}
            onChange={(e) => setCode(e.currentTarget.value)}
          />
          <Button
            sx={{ width: 120 }}
            variant="contained"
            onClick={handleSendCode}
          >
            Send
          </Button>
        </Stack>
      ) : (
        <>
          <Stack direction="row" spacing={2}>
            <Button
              className={classes.button}
              variant={
                AppConstant.USER_TYPE.candidate === userType
                  ? "contained"
                  : "outlined"
              }
              onClick={() => setUserType(AppConstant.USER_TYPE.candidate)}
            >
              <AppTypography>Candidate</AppTypography>
              <AppTypography>Register as a Candidate</AppTypography>
            </Button>
            <Button
              className={classes.button}
              variant={
                AppConstant.USER_TYPE.employer === userType
                  ? "contained"
                  : "outlined"
              }
              onClick={() => setUserType(AppConstant.USER_TYPE.employer)}
            >
              <AppTypography>Employer</AppTypography>
              <AppTypography>Register as an Employer</AppTypography>
            </Button>
          </Stack>
          <Stack spacing={2}>
            <Box>
              <AppTypography>Username</AppTypography>
              <AppInput
                value={userName}
                onChange={(e) => setUserName(e.currentTarget.value)}
                fullWidth
                placeholder="Your Username"
              />
            </Box>
            <Box>
              <AppTypography>Email</AppTypography>
              <AppInput
                value={email}
                onChange={handleChangeEmail}
                fullWidth
                placeholder="Your Email"
                error={Boolean(errorEmailMsg)}
                helperText={errorEmailMsg}
              />
            </Box>
            <Box>
              <AppTypography>Password</AppTypography>
              <PasswordInput
                value={password}
                onChangeValue={(value) => setPassword(value)}
                fullWidth
                placeholder="Your Password"
              />
            </Box>
            <Box>
              <AppTypography>Phone Number</AppTypography>
              <AppInput
                value={phone}
                onChange={handleChangePhone}
                fullWidth
                placeholder="Your Phone"
                error={Boolean(errorPhoneMsg)}
                helperText={errorPhoneMsg}
              />
            </Box>

            <Box display="flex" alignItems="center">
              <Switch checked={isAgree} onChange={handleAgree} />
              <AppTypography>
                By signing up, you agree to our
                <AppTypography
                  sx={{ ml: 1 }}
                  color="primary.main"
                  component="span"
                >
                  Privacy Policy.
                </AppTypography>
              </AppTypography>
            </Box>
            <Stack spacing={1}>
              <Button
                disabled={isDisabledButton}
                onClick={handleRegister}
                variant="contained"
              >
                {isLoading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "REGISTER"
                )}
              </Button>
            </Stack>
          </Stack>
        </>
      )}
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
          {error || "You have successfully registered, login now!"}
        </Alert>
      </Snackbar>
    </>
  );
};

type EmployerFormProps = {};

export default EmployerForm;

export const COMPANY_LOCATION_DATA = [
  { value: AppConstant.COMPANY_LOCATION.hanoi, label: "Ha Noi" },
  { value: AppConstant.COMPANY_LOCATION.hoChiMinh, label: "Ho Chi Minh" },
  { value: AppConstant.COMPANY_LOCATION.daNang, label: "Da nang" },
  { value: AppConstant.COMPANY_LOCATION.other, label: "other" },
];

const useStyles = makeStyles((theme: ThemeProps) => ({
  button: {
    flexDirection: "column",
    flex: 1,
  },
}));
