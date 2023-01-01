import { AppConstant } from "const";
import React, { memo, useState } from "react";
import AppSelect from "../AppSelect";

const JobExperienceSelect = ({
  onChangeJobExperience,
}: JobExperienceSelectSelectProps) => {
  const [jobExperience, setJobExperience] = useState();

  const handleChangeJobExperience = (item: any) => {
    setJobExperience(item.value);
    onChangeJobExperience(item.value);
  };

  return (
    <AppSelect
      selectedIndex={jobExperience}
      onSelected={handleChangeJobExperience}
      data={Job_Experience}
    />
  );
};

type JobExperienceSelectSelectProps = {
  onChangeJobExperience: (item: any) => void;
};

export default memo(JobExperienceSelect);

export const Job_Experience = [
  { value: AppConstant.EXPERIENCE_TYPE.fresher, label: "1-2 years" },
  { value: AppConstant.EXPERIENCE_TYPE.junior, label: "2-3 years" },
  { value: AppConstant.EXPERIENCE_TYPE.middle, label: "3-5 years" },
  { value: AppConstant.EXPERIENCE_TYPE.senior, label: "5+ years" },
];
