import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AppInput from "./AppInput";

export default function BasicDatePicker({
  value,
  onChangeDate,
}: BasicDatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value}
        onChange={(newValue) => {
          onChangeDate(newValue);
        }}
        renderInput={(params: any) => <AppInput {...params} />}
      />
    </LocalizationProvider>
  );
}

type BasicDatePickerProps = {
  value: any;
  onChangeDate: (value: any) => void;
};
