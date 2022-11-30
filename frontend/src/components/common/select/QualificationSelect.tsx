import React, { useState } from "react";
import AppSelect from "../AppSelect";

const QualificationSelect = ({
  onChangeQualification,
}: QualificationSelectProps) => {
  const [qualification, setQualification] = useState(QUALIFICATION[0]);

  const handleChangeCategory = (item: any) => {
    setQualification(item);
    onChangeQualification(item);
  };

  return (
    <AppSelect
      selectedIndex={qualification.value}
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
  { value: 1, label: "Master Degree" },
  { value: 2, label: "Master Degree" },
  { value: 3, label: "Master Degree" },
];
