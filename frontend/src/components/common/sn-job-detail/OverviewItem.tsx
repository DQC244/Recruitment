import { IconButton, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import React, { memo, ReactNode } from "react";
import AppTypography from "../AppTypography";

const OverviewItem = ({ icon, description, label }: OverviewProps) => {
  const classes = useStyles();
  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <IconButton disableRipple disableFocusRipple className={classes.icon}>
        {icon}
      </IconButton>
      <Stack>
        <AppTypography>{label}</AppTypography>
        <AppTypography
          color="grey.300"
          sx={{
            textTransform: "capitalize",
          }}
        >
          {description || "- -"}
        </AppTypography>
      </Stack>
    </Stack>
  );
};

type OverviewProps = {
  icon: ReactNode;
  description?: string;
  label: string;
};

export default memo(OverviewItem);

const useStyles = makeStyles((theme: ThemeProps) => ({
  icon: {
    color: theme.palette.primary.main,
    fontSize: 40,
    padding: 0,
  },
}));
