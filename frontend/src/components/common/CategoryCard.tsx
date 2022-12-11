import React from "react";
import { Box, Button, Grid, GridProps, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import AppTypography from "./AppTypography";
import { useRouter } from "next/router";
import { AppConstant, PathConstant } from "const";
import { useDispatch } from "react-redux";
import { CompanyActions } from "redux-store";

const CategoryCard = ({ data, ...otherProps }: CardJobProps) => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClickCategory = () => {
    dispatch(
      CompanyActions.setQueryParams({
        ...AppConstant.DEFAULT_PAGINATION,
        categoryId: data._id,
      })
    );
    router.push(PathConstant.COMPANY);
  };

  return (
    <Grid item {...otherProps}>
      <Box className={classes.root}>
        <Stack alignItems="center">
          <Box className={classes.logoWrapper}>
            <Box component="img" src={data.image} className={classes.logo} />
          </Box>
          <Button className={classes.button} onClick={handleClickCategory}>
            <AppTypography
              textAlign="center"
              className="eclipse"
              textTransform="capitalize"
            >
              {data.name}
            </AppTypography>
          </Button>
        </Stack>
      </Box>
    </Grid>
  );
};

type CardJobProps = GridProps & {
  data: {
    _id?: string;
    name?: string;
    image?: string;
  };
};

export default CategoryCard;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[200]}`,
    boxShadow: "10px 12px 12px 0px rgba(0,0,0,0.07)",
  },
  logoWrapper: {
    width: "100%",
    height: 200,
  },
  logo: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    border: `1px solid ${theme.palette.grey[300]}`,
    objectFit: "cover",
  },
  button: {
    width: "100%",
    justifyContent: "flex-start",
    borderRadius: "unset",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  },
}));
