import React, { ChangeEvent, memo, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { CommonUtils } from "utils";
import AppInput from "../AppInput";
import AppTypography from "../AppTypography";
import FilterLayout from "./FilterLayout";

const SalaryFilter = ({ data, onChangeValue }: SalaryFilterProps) => {
  const [valueArr, setValueArr] = useState<(number | string)[]>(["", ""]);

  const handleChangeValueFunc =
    (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
      let newValueArr = [...valueArr];

      let newValue: string | number = CommonUtils.removeUnnecessarySpace(
        event.target.value
      );

      if (key === KEY.min) {
        newValue = isNaN(newValue as any) ? valueArr[0] : newValue;
        newValueArr[0] = newValue;
      } else {
        newValue = isNaN(newValue as any) ? valueArr[1] : newValue;
        newValueArr[1] = newValue;
      }

      setValueArr(newValueArr);
      onChangeValue(newValueArr);
    };

  useEffect(() => {
    if (data?.length) {
      setValueArr(data);
    }
  }, [data]);

  return (
    <FilterLayout title="Salary (USD)">
      <Box className="space-between-root">
        <AppInput
          value={valueArr[0]}
          onChange={handleChangeValueFunc(KEY.min)}
        />
        <AppTypography sx={{ mx: 1 }} variant="subtitle2">
          to
        </AppTypography>
        <AppInput
          value={valueArr[1]}
          onChange={handleChangeValueFunc(KEY.max)}
        />
      </Box>
    </FilterLayout>
  );
};

type SalaryFilterProps = {
  data?: (number | string)[];
  onChangeValue: (value: (number | string)[]) => void;
};

export default memo(SalaryFilter);

const KEY = {
  min: "min",
  max: "max",
};
