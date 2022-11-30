import React, { memo, useState } from "react";
import AppSelect from "../AppSelect";

const JobExperienceSelect = ({
  onChangeJobExperience,
}: JobExperienceSelectSelectProps) => {
  const [jobExperience, setJobExperience] = useState(Job_Experience[0]);

  const handleChangeJobExperience = (item: any) => {
    setJobExperience(item);
    onChangeJobExperience(item);
  };

  return (
    <AppSelect
      selectedIndex={jobExperience.value}
      onSelected={handleChangeJobExperience}
      data={Job_Experience}
    />
  );
};

type JobExperienceSelectSelectProps = {
  onChangeJobExperience: (item: any) => void;
};

export default memo(JobExperienceSelect);

const Job_Experience = [
  { value: 1, label: "1-2 years" },
  { value: 2, label: "1-2 years" },
  { value: 3, label: "1-2 years" },
  { value: 4, label: "1-2 years" },
];
