import React, { useMemo } from "react";
import { AppConstant } from "const";
import FiltersBox, { FiltersBoxProps } from "./FiltersBox";

const JobType = ({ value, ...otherProps }: JobTypeProps) => {
  const defaultFilters = useMemo(() => getDefaultFilters(), []);

  const rarityFilters = useMemo(
    () =>
      defaultFilters.map((item) => ({
        ...item,
        checked: value === item.value,
      })),
    [value, defaultFilters]
  );

  return <FiltersBox title="Job Type" data={rarityFilters} {...otherProps} />;
};

type JobTypeProps = FiltersBoxProps & {
  value?: number;
};

export default JobType;

const getDefaultFilters = () => {
  return [
    {
      value: AppConstant.JOB_TYPE.freelance,
      label: "Freelance",
      checked: false,
    },
    {
      value: AppConstant.JOB_TYPE.fulltime,
      label: "Fulltime",
      checked: false,
    },
    {
      value: AppConstant.JOB_TYPE.partTime,
      label: "Part Time",
      checked: false,
    },
    {
      value: AppConstant.JOB_TYPE.internship,
      label: "Internship",
      checked: false,
    },
    {
      value: AppConstant.JOB_TYPE.temporary,
      label: "Temporary",
      checked: false,
    },
  ];
};
