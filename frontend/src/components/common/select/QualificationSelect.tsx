import { AppConstant } from "const";
import React, { useState } from "react";
import AppSelect from "../AppSelect";

const QualificationSelect = ({
  onChangeQualification,
}: QualificationSelectProps) => {
  const [qualification, setQualification] = useState();

  const handleChangeCategory = (item: any) => {
    setQualification(item.value);
    onChangeQualification(item.value);
  };

  return (
    <AppSelect
      selectedIndex={qualification}
      onSelected={handleChangeCategory}
      data={QUALIFICATION}
    />
  );
};

type QualificationSelectProps = {
  onChangeQualification: (item: any) => void;
};

export default QualificationSelect;

const QUALIFICATION = [
  {
    value: AppConstant.QUALIFICATION.bachelorDegree,
    label: "Master Degree",
  },
  {
    value: AppConstant.QUALIFICATION.doctorateDegree,
    label: "Doctorate Degree",
  },
  {
    value: AppConstant.QUALIFICATION.highSchool,
    label: "High School",
  },
  {
    value: AppConstant.QUALIFICATION.masterDegree,
    label: "Master Degree",
  },
];
