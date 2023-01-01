import { Box, Button, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { EmailIcon } from "components/icons";
import { CompanyClass } from "models";
import { ThemeProps } from "models/types";
import React from "react";
import AppImage from "../AppImage";
import AppTypography from "../AppTypography";

const CompanyPanel = ({ data }: CompanyPanelProps) => {
  const classes = useStyles();

  return (
    <Stack className={classes.root} direction="row" spacing={3}>
      <Box component="img" className={classes.image} src={data?.logo} />
      <Stack spacing={3} justifyContent="center">
        <AppTypography variant="h4">{data?.name}</AppTypography>
        <Button
          startIcon={<EmailIcon className={classes.emailIcon} />}
          className={classes.emailButton}
          href={`mailto:${data?.email}`}
        >
          {data?.email}
        </Button>
      </Stack>
    </Stack>
  );
};

type CompanyPanelProps = {
  data?: CompanyClass;
};

export default CompanyPanel;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    width: "100%",
    border: "1px solid #e3e3e3",
    boxShadow: "0 5px 25px rgb(0 0 0 / 8%)",
    padding: 30,
  },
  image: {
    width: 120,
    height: 120,
    objectFit: "contain",
    backgroundColor: theme.palette.grey[100],
    border: `1px solid ${theme.palette.grey[300]}`,
  },
  emailButton: {
    padding: 0,
    color: theme.palette.grey[400],
  },
  emailIcon: {
    stroke: theme.palette.primary.main,
    fontSize: 32,
  },
}));
