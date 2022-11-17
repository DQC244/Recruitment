import { FormControlLabel, FormGroup } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppAccordion, AppCheckbox } from "components/common";
import { ThemeProps } from "models/types";
import React, { memo, useEffect, useState } from "react";
import { COMPANY_LOCATION_DATA } from "../sn-register/EmployerForm";

const Location = ({ onChangeLocation, data }: LocationProps) => {
  const classes = useStyles();

  const [filter, setFilter] = useState<number[]>([]);

  const handleChangeLocation = (value: number) => {
    let newFilter = [...filter];
    let index = newFilter.indexOf(value);
    if (index !== -1) {
      newFilter.splice(index, 1);
    } else {
      newFilter = [...newFilter, value];
    }

    setFilter(newFilter);
    onChangeLocation(newFilter);
  };

  useEffect(() => {
    if (data?.length) {
      setFilter(data);
    }
  }, [data]);

  return (
    <AppAccordion
      labelProps={{
        label: "Location",
      }}
    >
      <FormGroup>
        {COMPANY_LOCATION_DATA.map((item, index) => (
          <FormControlLabel
            className={classes.item}
            key={index}
            control={
              <AppCheckbox
                checked={filter.includes(item.value)}
                onChange={() => handleChangeLocation(item.value)}
              />
            }
            label={item.label}
          />
        ))}
      </FormGroup>
    </AppAccordion>
  );
};

type LocationProps = {
  data?: number[];
  onChangeLocation: (value: number[]) => void;
};

export default memo(Location);

const useStyles = makeStyles((theme: ThemeProps) => ({
  item: {
    marginBottom: theme.spacing(1),
    "&:last-child": {
      margin: 0,
    },
  },
}));
