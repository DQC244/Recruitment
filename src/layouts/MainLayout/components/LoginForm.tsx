import { Box, Button, CircularProgress, Stack } from "@mui/material";
import {
  AppInput,
  AppLink,
  AppTypography,
  PasswordInput,
} from "components/common";
import { PathConstant } from "const";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LoginForm = ({ onClose }: LoginFormProps) => {
  const { t: getLabel } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    setIsLoading(true);
  };

  return (
    <Stack spacing={2}>
      <Box>
        <AppTypography>{getLabel("lUsernameEmail")}</AppTypography>
        <AppInput
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          fullWidth
          placeholder={getLabel("pYourUserName")}
        />
      </Box>
      <Box>
        <AppTypography>{getLabel("lPassword")}</AppTypography>
        <PasswordInput
          value={password}
          onChangeValue={(value) => setPassword(value)}
          fullWidth
          placeholder={getLabel("pYourPassword")}
        />
      </Box>
      <Stack spacing={1}>
        <Button disabled={isLoading} onClick={handleSignIn} variant="contained">
          {isLoading ? (
            <CircularProgress sx={{ color: "white" }} />
          ) : (
            getLabel("lSignIn")
          )}
        </Button>
        <AppTypography></AppTypography>
        <AppLink onClick={onClose} href={PathConstant.REGISTER}>
          Don't have an account?
        </AppLink>
        <AppLink href="#">Forgot Password?</AppLink>
      </Stack>
    </Stack>
  );
};

type LoginFormProps = {
  onClose: () => void;
};

export default LoginForm;
