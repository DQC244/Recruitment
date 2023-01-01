import React, { ChangeEvent, memo, useEffect, useState } from "react";
import { CommonUtils } from "utils";
import AppInput from "../AppInput";
import FilterLayout from "./FilterLayout";

const SalaryFilter = ({ data, onChangeValue }: SalaryFilterProps) => {
  const [value, setValue] = useState<number | string>("");

  const handleChangeValueFunc = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue: string | number = CommonUtils.removeUnnecessarySpace(
      event.target.value
    );

    newValue = isNaN(newValue as any) ? value : newValue;

    setValue(newValue);
    onChangeValue(Number(newValue));
  };

  useEffect(() => {
    if (data) {
      setValue(data);
    } else {
      setValue("");
    }
  }, [data]);

  return (
    <FilterLayout title="Salary (USD)">
      <AppInput value={value} onChange={handleChangeValueFunc} />
    </FilterLayout>
  );
};

type SalaryFilterProps = {
  data?: number | string;
  onChangeValue: (value: number) => void;
};

export default memo(SalaryFilter);
