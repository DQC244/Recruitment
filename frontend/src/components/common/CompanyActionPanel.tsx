import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import AppInput from "./AppInput";
import AppSelect from "./AppSelect";
import AppTypography from "./AppTypography";
import BasicDateTimePicker from "./BasicDateTimePicker";
import { CategoriesSelect } from "./select";
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

  const handleChangeLogo = () => {
    return;
  };
  const handleChangeImage = () => {
    return;
  };

  return (
    <>
      <Box sx={{ mt: 3 }}>
        <AppTypography variant="h3">Company Details</AppTypography>
      </Box>
      <Stack spacing={3} mt={5}>
        <Stack direction="row" flex={1} spacing={5}>
          <Stack flex={1} spacing={2}>
            <AppInput label="Company Name" />
            <AppInput label="Company Email" />
            <Stack>
              <AppTypography variant="subtitle2">Location</AppTypography>
              <AppSelect
                data={COMPANY_LOCATION_DATA}
                selectedIndex={companyLocation.value}
                onSelected={handleChangeLocationCompany}
              />
            </Stack>
            <Stack>
              <AppTypography variant="subtitle2">
                Company Category
              </AppTypography>
              <CategoriesSelect onChangeCategories={setCategories} />
            </Stack>
          </Stack>
          <Stack flex={1} spacing={2}>
            <AppInput label="Company Website" />
            <AppInput label="Company Contact Phone" />
            <Stack>
              <AppTypography variant="subtitle2">Since</AppTypography>
              <BasicDateTimePicker />
            </Stack>
            <AppInput label="Company Team Size" />
          </Stack>
        </Stack>
        <AppInput label="Company Description" multiline />
        <Stack direction="row" spacing={5}>
          <Stack spacing={3} flex={1}>
            <AppInput label="Facebook" />
            <AppInput label="Twitter" />
          </Stack>
          <Stack spacing={3} flex={1}>
            <AppInput label="Linkedin" />
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
