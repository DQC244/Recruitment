import { Box, Grid, GridProps, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { LocationIcon } from "components/icons";
import { ThemeProps } from "models/types";
import React from "react";
import AppImage from "./AppImage";
import AppTypography from "./AppTypography";

const CompanyCard = ({ data, ...otherProps }: CardJobProps) => {
  const classes = useStyles();
  return (
    <Grid item {...otherProps}>
      <Box className={classes.root}>
        <Stack spacing={1} alignItems="center">
          <Box className={classes.logoWrapper}>
            {data.companyLogo && (
              <AppImage
                src={data.companyLogo}
                className={classes.logo}
                objectFit="cover"
              />
            )}
          </Box>
          <AppTypography textAlign="center" variant="h5" className="eclipse">
            {data.companyName}
          </AppTypography>
          <Stack spacing={1} direction="row">
            <LocationIcon />
            <AppTypography
              color="grey.500"
              textAlign="center"
              variant="subtitle2"
              className="eclipse"
            >
              {data.companyLocation}
            </AppTypography>
          </Stack>
        </Stack>
      </Box>
    </Grid>
  );
};

type CardJobProps = GridProps & {
  data: {
    companyName?: string;
    companyLogo?: string;
    companyLocation?: string;
  };
};

export default CompanyCard;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    border: `1px solid ${theme.palette.grey[300]}`,
    padding: 16,
    borderRadius: 4,
    cursor: "pointer",
    backgroundColor: theme.palette.common.white,

    "&:hover": {
      borderColor: theme.palette.primary.main,
    },
  },
  logoWrapper: {
    width: 60,
    height: 60,
  },
  logo: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    border: `1px solid ${theme.palette.grey[300]}`,
  },
}));
