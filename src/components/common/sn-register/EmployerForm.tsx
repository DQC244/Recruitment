import { Box, Button, CircularProgress, Stack, Switch } from "@mui/material";
import {
  AppInput,
  AppTypography,
  AppSelect,
  PasswordInput,
} from "components/common";
import { AppConstant } from "const";
import React, { ReactNode, useState } from "react";

const EmployerForm = () => {
  const [isAgree, setIsAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [companyLocation, setCompanyLocation] = useState<company>(
    COMPANY_LOCATION_DATA[0]
  );
  const [companyName, setCompanyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  const isDisabledButton =
    !userName ||
    !email ||
    !password ||
    !isAgree ||
    isLoading ||
    !phone ||
    !companyName ||
    !websiteUrl;

  const handleAgree = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgree(event.target.checked);
  };

  const handleChangeLocationCompany = (item: company) => {
    setCompanyLocation(item);
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
      <Box>
        <AppTypography>Phone Number</AppTypography>
        <AppInput
          value={phone}
          onChange={(e) => setPhone(e.currentTarget.value)}
          fullWidth
          placeholder="Your Phone"
        />
      </Box>
      <Box>
        <AppTypography>Company Location</AppTypography>
        <AppSelect
          selectedIndex={companyLocation.value}
          onSelected={handleChangeLocationCompany}
          data={COMPANY_LOCATION_DATA}
        />
      </Box>

      <Box>
        <AppTypography>Company Name</AppTypography>
        <AppInput
          value={companyName}
          onChange={(e) => setCompanyName(e.currentTarget.value)}
          fullWidth
          placeholder="Your Company Name"
        />
      </Box>
      <Box>
        <AppTypography>Website URL</AppTypography>
        <AppInput
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.currentTarget.value)}
          fullWidth
          placeholder="Your Website"
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

type company = {
  value: string | number;
  label: ReactNode;
};

export default EmployerForm;

export const COMPANY_LOCATION_DATA = [
  { value: AppConstant.COMPANY_LOCATION.hanoi, label: "Ha Noi" },
  { value: AppConstant.COMPANY_LOCATION.hoChiMinh, label: "Ho Chi Minh" },
  { value: AppConstant.COMPANY_LOCATION.daNang, label: "Da nang" },
  { value: AppConstant.COMPANY_LOCATION.other, label: "other" },
];
