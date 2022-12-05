import { Box, Button, CircularProgress, Stack } from "@mui/material";
import {
  AppInput,
  AppLink,
  AppTypography,
  PasswordInput,
} from "components/common";
import { PathConstant } from "const";
import { useAuthContext } from "context";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LoginForm = ({ onClose }: LoginFormProps) => {
  const { t: getLabel } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { handleLogin } = useAuthContext();

  const handleSignIn = async () => {
    setIsLoading(true);
    await handleLogin(
      {
        email,
        password,
      },
      setError
    );
    setIsLoading(false);
  };

  return (
    <Stack spacing={2}>
      <Box>
        <AppTypography>{getLabel("lUsernameEmail")}</AppTypography>
        <AppInput
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
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
        <Button
          disabled={!email || !password || isLoading}
          onClick={handleSignIn}
          variant="contained"
        >
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            getLabel("lSignIn")
          )}
        </Button>
        <AppTypography color="error.main">{error}</AppTypography>
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
