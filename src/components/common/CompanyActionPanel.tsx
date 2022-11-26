import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import AppInput from "./AppInput";
import AppSelect from "./AppSelect";
import AppTypography from "./AppTypography";
import BasicDateTimePicker from "./BasicDateTimePicker";
import { CATEGORIES, company } from "./sn-home/Banner";
import { COMPANY_LOCATION_DATA } from "./sn-register/EmployerForm";
import UploadImageInput from "./UploadImageInput";

const CompanyActionPanel = () => {
  const [companyLocation, setCompanyLocation] = useState<company>(
    COMPANY_LOCATION_DATA[0]
  );
  const [categories, setCategories] = useState<company>(CATEGORIES[0]);

  const handleChangeLocationCompany = (item: company) => {
    setCompanyLocation(item);
  };

  const handleChangeCategory = (item: company) => {
    setCategories(item);
  };

  const handleChangeLogo = () => {
    return;
  };
  const handleChangeImage = () => {
    return;
  };

  return (
    <>
      <Box>
        <AppTypography>Company Details</AppTypography>
      </Box>
      <Stack spacing={3}>
        <Stack direction="row" flex={1} spacing={5}>
          <Stack flex={1} spacing={2}>
            <Stack>
              <AppTypography>Company Name</AppTypography>
              <AppInput />
            </Stack>
            <Stack>
              <AppTypography>Company Email</AppTypography>
              <AppInput />
            </Stack>
            <Stack>
              <AppTypography>Location</AppTypography>
              <AppSelect
                data={COMPANY_LOCATION_DATA}
                selectedIndex={companyLocation.value}
                onSelected={handleChangeLocationCompany}
              />
            </Stack>
            <Stack>
              <AppTypography>Company Category</AppTypography>
              <AppSelect
                selectedIndex={categories.value}
                onSelected={handleChangeCategory}
                data={CATEGORIES}
              />
            </Stack>
          </Stack>
          <Stack flex={1} spacing={2}>
            <Stack>
              <AppTypography>Company Website</AppTypography>
              <AppInput />
            </Stack>
            <Stack>
              <AppTypography>Company Contact Phone</AppTypography>
              <AppInput />
            </Stack>
            <Stack>
              <AppTypography>Since</AppTypography>
              <BasicDateTimePicker />
            </Stack>
            <Stack>
              <AppTypography>Company Team Size</AppTypography>
              <AppInput />
            </Stack>
          </Stack>
        </Stack>
        <AppTypography>Company Description</AppTypography>
        <AppInput multiline />
        <Stack direction="row" spacing={5}>
          <Stack spacing={3} flex={1}>
            <Stack>
              <AppTypography>Facebook</AppTypography>
              <AppInput />
            </Stack>
            <Stack>
              <AppTypography>Twitter</AppTypography>
              <AppInput />
            </Stack>
          </Stack>
          <Stack spacing={3} flex={1}>
            <Stack>
              <AppTypography>Linkedin</AppTypography>
              <AppInput />
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing={3}>
          <UploadImageInput onChangeImage={handleChangeLogo} label="Logo" />
          <UploadImageInput onChangeImage={handleChangeImage} label="Image" />
        </Stack>
      </Stack>
    </>
  );
};

export default CompanyActionPanel;
