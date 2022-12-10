import { FormControlLabel, FormGroup } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppAccordion, AppCheckbox } from "components/common";
import { ThemeProps } from "models/types";
import React, { memo, useEffect, useState } from "react";
import { Job_Experience } from "../select/JobExperienceSelect";

const CategoriesFilter = ({
  data,
  onChangeCategories,
  ...otherProps
}: CategoriesFilterProps) => {
  const classes = useStyles();
  const [filter, setFilter] = useState<number[]>([]);

  const handleChange = (value: number) => {
    let newFilter = [...filter];
    let index = newFilter.indexOf(value);
    if (index !== -1) {
      newFilter.splice(index, 1);
    } else {
      newFilter = [...newFilter, value];
    }

    setFilter(newFilter);
    onChangeCategories(newFilter);
  };

  useEffect(() => {
    if (data?.length) {
      setFilter(data);
    } else {
      setFilter([]);
    }
  }, [data]);

  return (
    <AppAccordion
      labelProps={{
        label: "Experience",
      }}
      {...otherProps}
    >
      <FormGroup>
        {Job_Experience.map((item, index) => (
          <FormControlLabel
            className={classes.item}
            key={index}
            control={
              <AppCheckbox
                checked={filter.includes(item.value)}
                onChange={() => handleChange(item.value)}
              />
            }
            label={item.label}
          />
        ))}
      </FormGroup>
    </AppAccordion>
  );
};

type CategoriesFilterProps = {
  data?: number[];

  onChangeCategories: (value: number[]) => void;
};

export default memo(CategoriesFilter);

const useStyles = makeStyles((theme: ThemeProps) => ({
  item: {
    marginBottom: theme.spacing(1),
    "&:last-child": {
      margin: 0,
    },
  },
}));
