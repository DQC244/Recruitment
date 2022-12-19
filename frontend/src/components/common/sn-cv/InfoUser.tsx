import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  CalenderIcon,
  EmailIcon,
  PhoneIcon,
  UserIcon,
  NetworkIcon,
  LocationIcon,
} from "components/icons";
import { ThemeProps } from "models/types";
import React from "react";

const InfoUser = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.wrapper}>
        <UserIcon />
        <p className={classes.text} contentEditable={true} suppressContentEditableWarning={true}>
          Nam
        </p>
      </Box>
      <Box className={classes.wrapper}>
        <CalenderIcon />
        <p className={classes.text} contentEditable={true} suppressContentEditableWarning={true}>
          19/05/1992
        </p>
      </Box>
      <Box className={classes.wrapper}>
        <PhoneIcon />
        <p className={classes.text} contentEditable={true} suppressContentEditableWarning={true}>
          0961874818
        </p>
      </Box>
      <Box className={classes.wrapper}>
        <EmailIcon className={classes.icon} />
        <p className={classes.text} contentEditable={true} suppressContentEditableWarning={true}>
          chien@gmail.com
        </p>
      </Box>
      <Box className={classes.wrapper}>
        <NetworkIcon />
        <p className={classes.text} contentEditable={true} suppressContentEditableWarning={true}>
          https://fb.com/topcv.vn
        </p>
      </Box>
      <Box className={classes.wrapper}>
        <LocationIcon />
        <p className={classes.text} contentEditable={true} suppressContentEditableWarning={true}>
          ha noi
        </p>
      </Box>
    </Box>
  );
};

export default InfoUser;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    padding: "16px 0px",
    color: "white",
    fontWeight: 700,
  },
  text: {
    margin: "0px 0px 0px 16px",
    maxWidth: "90%",
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    marginTop: 8,

    "&:first-child": {
      marginTop: 0,
    },
  },
  icon: {
    stroke: "white",
  },
}));
