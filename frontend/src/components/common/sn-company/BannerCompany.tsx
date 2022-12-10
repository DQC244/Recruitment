import React from "react";
import { Box, BoxProps, IconButton, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import AppTypography from "../AppTypography";
import AppLink from "../AppLink";
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  NetworkIcon,
  PhoneIcon,
  TwitterIcon,
} from "components/icons";
import { CompanyClass } from "models";

const BannerCompany = ({ data, ...otherProps }: BannerCompanyProps) => {
  const classes = useStyles();

  return (
    <Box {...otherProps}>
      <Stack className={classes.wrapper} spacing={3} direction="row">
        <Box component="img" className={classes.logoCompany} src={data?.logo} />
        <Stack spacing={2} flex={1}>
          <AppTypography variant="h4">{data?.name}</AppTypography>
          <Stack direction="row" spacing={2}>
            <Stack spacing={0.5} direction="row" alignItems="center">
              {data?.website?.web && (
                <>
                  <NetworkIcon className={classes.icon} />
                  <AppLink color="grey.500" href={"heft"}>
                    {data?.website?.web}
                  </AppLink>
                </>
              )}
            </Stack>
            <Stack spacing={0.5} direction="row" alignItems="center">
              <PhoneIcon className={classes.icon} />
              <AppLink color="grey.500" href={`tel:${data?.phone}`}>
                {data?.phone}
              </AppLink>
            </Stack>
            <Stack spacing={0.5} direction="row" alignItems="center">
              <EmailIcon className={classes.icon} />
              <AppLink color="grey.500" href={`mailto:${data?.email}`}>
                {data?.email}
              </AppLink>
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            {data?.website?.facebook && (
              <IconButton
                href={data?.website?.facebook}
                target="_blank"
                className={classes.socialButton}
              >
                <FacebookIcon />
              </IconButton>
            )}
            {data?.website?.twitter && (
              <IconButton
                href={data?.website?.twitter}
                target="_blank"
                className={classes.socialButton}
              >
                <TwitterIcon />
              </IconButton>
            )}
            {data?.website?.linkedin && (
              <IconButton
                href={data?.website?.linkedin}
                target="_blank"
                className={classes.socialButton}
              >
                <LinkedinIcon />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

type BannerCompanyProps = BoxProps & {
  data?: CompanyClass;
};

export default BannerCompany;

const useStyles = makeStyles((theme: ThemeProps) => ({
  container: {
    position: "absolute",
    bottom: -100,
    width: "100%",
  },
  wrapper: {
    height: 200,
    width: "100%",
    background: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: 12,
    alignItems: "center",
    padding: theme.spacing(5),
  },
  logoCompany: {
    width: 120,
    height: 120,
    borderRadius: 4,
    objectFit: "contain",
    border: `1px solid ${theme.palette.grey[300]}`,
  },
  icon: {
    color: theme.palette.primary.main,
    stroke: theme.palette.primary.main,
  },
  socialButton: {
    fontSize: 32,
    borderRadius: "50%",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));
