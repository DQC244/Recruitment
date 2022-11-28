import { Box, Stack } from "@mui/material";
import React, { memo, useState } from "react";
import { AppSelect, BasicDateTimePicker } from ".";
import AppInput from "./AppInput";
import AppTypography from "./AppTypography";
import { defaultFilters } from "./filter/JobType";
import {
  CategoriesSelect,
  JobExperienceSelect,
  QualificationSelect,
} from "./select";
import { CATEGORIES } from "./sn-home/Banner";
import UploadImageInput from "./UploadImageInput";

const JobActionPanel = () => {
  const [jobType, setJobType] = useState(defaultFilters[0]);
  const [jobTag, setJobTag] = useState(MOCK_JOB_TAG[0]);
  const [categories, setCategories] = useState(CATEGORIES[0]);
  const [qualification, setQualification] = useState();
  const [jobExperience, setJobExperience] = useState();

  const handleChangeJobType = () => {
    return;
  };
  const handleChangeLogo = () => {
    return;
  };

  return (
    <>
      <AppTypography variant="h3" mt={3}>
        Job Detail
      </AppTypography>
      <Stack spacing={3} mt={5}>
        <AppInput label="Job Title" />
        <AppInput label="Location" />
        <Box>
          <AppTypography variant="subtitle2">Job Type</AppTypography>
          <AppSelect
            data={defaultFilters}
            selectedIndex={jobType.value}
            onSelected={handleChangeJobType}
          />
        </Box>
        <Box>
          <AppTypography variant="subtitle2">Job Tag</AppTypography>
          <AppSelect
            data={MOCK_JOB_TAG}
            selectedIndex={jobTag.value}
            onSelected={handleChangeJobType}
          />
        </Box>
        <Box>
          <AppTypography variant="subtitle2">Job Categories</AppTypography>
          <CategoriesSelect onChangeCategories={setCategories} />
        </Box>
        <AppInput label="Description" multiline />
        <Stack>
          <AppTypography variant="subtitle2">Since</AppTypography>
          <BasicDateTimePicker />
        </Stack>
        <Box>
          <AppTypography variant="subtitle2">
            Job Qualification (Optional)
          </AppTypography>
          <QualificationSelect onChangeQualification={setQualification} />
        </Box>
        <Box>
          <AppTypography variant="subtitle2">
            Job Qualification (Optional)
          </AppTypography>
          <JobExperienceSelect onChangeJobExperience={setJobExperience} />
        </Box>
        <Stack direction="row" spacing={6}>
          <AppInput label="Minimum Salary" />
          <AppInput label="Maximum Salary " />
        </Stack>
        <UploadImageInput
          onChangeImage={handleChangeLogo}
          label="Cover Image"
        />
      </Stack>
    </>
  );
};

export default memo(JobActionPanel);

const MOCK_JOB_TAG = [
  {
    label: "marketing",
    value: 0,
  },
  {
    label: "marketing",
    value: 0,
  },
  {
    label: "marketing",
    value: 0,
  },
];
