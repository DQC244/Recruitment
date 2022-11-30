import { Box, Button, CircularProgress, Stack, Switch } from "@mui/material";
import { AppInput, AppTypography, PasswordInput } from "components/common";
import React, { useMemo, useState } from "react";

const CandidateForm = () => {
  const [isAgree, setIsAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const isDisabledButton = useMemo(
    () => !userName || !email || !password || !isAgree || isLoading,
    [userName, email, password, isAgree]
  );

  const handleAgree = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgree(event.target.checked);
  };

  const handleRegister = () => {
    setIsLoading(true);
  };

  return (
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
          onChange={(e) => setEmail(e.currentTarget.value)}
          fullWidth
          placeholder="Your Email"
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
      <Box display="flex" alignItems="center">
        <Switch checked={isAgree} onChange={handleAgree} />
        <AppTypography>
          By signing up, you agree to our
          <AppTypography sx={{ ml: 1 }} color="primary.main" component="span">
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
  );
};

export default CandidateForm;
