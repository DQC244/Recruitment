import { AppConstant } from "const";
import React, { useState } from "react";
import AppSelect from "../AppSelect";

const JobTypeSelect = ({ onChangeJobType }: JobTypeProps) => {
  const [selected, setSelected] = useState<number>();

  const handleChangeJobType = (item: any) => {
    setSelected(item.value);
    onChangeJobType(item.value);
  };

  return (
    <AppSelect
      data={data}
      selectedIndex={selected}
      onSelected={handleChangeJobType}
    />
  );
};

type JobTypeProps = {
  onChangeJobType: (value: number) => void;
};

export default JobTypeSelect;

const data = [
  {
    value: AppConstant.JOB_TYPE.freelance,
    label: "Freelance",
  },
  {
    value: AppConstant.JOB_TYPE.fulltime,
    label: "Fulltime",
  },
  {
    value: AppConstant.JOB_TYPE.partTime,
    label: "PartTime",
  },
  {
    value: AppConstant.JOB_TYPE.internship,
    label: "Internship",
  },
  {
    value: AppConstant.JOB_TYPE.temporary,
    label: "Temporary",
  },
];
