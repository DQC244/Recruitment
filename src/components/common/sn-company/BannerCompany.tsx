import React from "react";
import { Box, Button, Container, IconButton, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { ImageConstant } from "const";
import AppImage from "../AppImage";
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

const BannerCompany = ({ data }: BannerCompanyProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.overlay}>
        <Container className={classes.container}>
          <Stack className={classes.wrapper} spacing={3} direction="row">
            <AppImage className={classes.logoCompany} src={data?.imageUrl} />
            <Stack spacing={2} flex={1}>
              <AppTypography variant="h4">{data?.name}</AppTypography>
              <Stack direction="row" spacing={2}>
                <Stack spacing={0.5} direction="row" alignItems="center">
                  <NetworkIcon className={classes.icon} />
                  <AppLink color="grey.500" href={"heft"}>
                    {data?.website?.web}
                  </AppLink>
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
              <Button variant="contained">Direct message</Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

type BannerCompanyProps = {
  data?: {
    name: string;
    imageUrl: string;
    phone: string;
    email: string;
    website: {
      web: string;
      facebook: string;
      linkedin: string;
      twitter: string;
    };
  };
};

export default BannerCompany;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    position: "relative",
    width: "100%",
    height: 500,
    background: `center url(${ImageConstant.CompanyBanner})`,
    marginBottom: 100,
  },
  overlay: {
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,.4)",
  },
  container: {
    position: "absolute",
    bottom: -100,
    width: "100%",
  },
  wrapper: {
    height: 200,
    width: "100%",
    background: theme.palette.common.white,
    boxShadow: "0 0 40px rgb(0 0 0 / 15%)",
    borderRadius: 4,
    alignItems: "center",
    padding: theme.spacing(5),
  },
  logoCompany: {
    width: 120,
    height: 120,
    background: theme.palette.grey[200],
    borderRadius: 4,
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
