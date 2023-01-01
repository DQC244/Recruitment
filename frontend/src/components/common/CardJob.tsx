import { Box, Grid, GridProps, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { LocationIcon } from "components/icons";
import { ThemeProps } from "models/types";
import React from "react";
import AppTypography from "./AppTypography";
import clsx from "clsx";
import { JobClass } from "models";
import { handleConvertDate } from "./sn-jobs/JobCard";

const CardJob = ({ data, ...otherProps }: CardJobProps) => {
  const classes = useStyles();
  return (
    <Grid item {...otherProps}>
      <Box className={classes.root}>
        <Stack spacing={1} alignItems="center">
          <Box className={classes.logoWrapper}>
            {data?.image && (
              <Box component="img" src={data.image} className={classes.logo} />
            )}
          </Box>
          <AppTypography textAlign="center" variant="h5" className="eclipse">
            {data?.title}
          </AppTypography>
          <AppTypography
            color="grey.400"
            textAlign="center"
            variant="subtitle2"
            className="eclipse"
          >
            {`$${data?.salary?.min} - $${data?.salary?.max}`}
          </AppTypography>
          <Stack spacing={1} direction="row">
            <LocationIcon />
            <AppTypography
              color="grey.500"
              textAlign="center"
              variant="subtitle2"
              className="eclipse"
              textTransform="capitalize"
            >
              {data?.location}
            </AppTypography>
          </Stack>
          <AppTypography
            variant="caption"
            className={clsx("eclipse", classes.date)}
          >
            {handleConvertDate(data?.updatedAt)}
          </AppTypography>
        </Stack>
      </Box>
    </Grid>
  );
};

type CardJobProps = GridProps & {
  data?: JobClass;
};

export default CardJob;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    position: "relative",
    border: `1px solid ${theme.palette.grey[300]}`,
    borderTop: `6px solid ${theme.palette.primary.main}`,
    padding: "48px 16px",
    borderRadius: 4,
    cursor: "pointer",

    "&:hover": {
      borderColor: theme.palette.secondary.main,
      backgroundColor: theme.palette.grey[100],
    },
  },
  logoWrapper: {
    width: 200,
    height: 200,
  },
  logo: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    overflow: "hidden",
    border: `1px solid ${theme.palette.grey[400]}`,
    objectFit: "cover",
  },
  date: {
    position: "absolute",
    top: 8,
    right: 8,
    color: theme.palette.secondary.main,
  },
}));
