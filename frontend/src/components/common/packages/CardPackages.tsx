import { Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import React, { ChangeEvent } from "react";
import AppRadio from "../AppRadio";
import clsx from "clsx";
import AppTypography from "../AppTypography";

const CardPackages = ({
  data,
  checked,
  onChangeChecked,
}: CardPackagesProps) => {
  const classes = useStyles();

  return (
    <Stack
      className={clsx("space-between-root", classes.root)}
      direction="row"
      spacing={12}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <AppRadio checked={checked} onChange={onChangeChecked} />
        <Stack spacing={1}>
          <AppTypography variant="h5">{data?.name}</AppTypography>
          <AppTypography color="grey.500">{data?.description}</AppTypography>
        </Stack>
      </Stack>
      <Stack spacing={2}>
        <AppTypography variant="h3" color="primary">
          {data?.price}
        </AppTypography>
        <AppTypography
          className={classes.textDesc}
          variant="caption"
          color="grey.600"
        >
          {data?.dayPayment}DAYS PAYMENT
        </AppTypography>
      </Stack>
    </Stack>
  );
};

type CardPackagesProps = {
  data?: {
    name?: string;
    description?: string;
    price?: number;
    dayPayment?: number;
  };
  checked?: boolean;
  onChangeChecked?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default CardPackages;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    minHeight: 200,
    width: "100%",
    boxShadow: "0 0 30px rgb(0 0 0 / 15%)",
    margin: theme.spacing(2),
    padding: theme.spacing(3),
  },
  textDesc: {
    whiteSpace: "nowrap",
  },
}));
