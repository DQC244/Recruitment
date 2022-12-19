import { Box, InputBase } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAuthContext } from "context";
import { ThemeProps } from "models/types";
import React from "react";
import UploadImageInput from "../UploadImageInput";
import InfoUser from "./InfoUser";
import MyEducation from "./MyEducation";
import MyFavorite from "./MyFavorite";
import MySkills from "./MySkills";
import MyTarget from "./MyTarget";
import Qualification from "./Qualification";

const MainCv = () => {
  const classes = useStyles();
  const { accountInfo } = useAuthContext();

  const handleChangeImage = () => {};

  return (
    <Box className={classes.root}>
      <p className={classes.logo}>DQC</p>
      <Box className={classes.info}>
        <p className={classes.name} contentEditable={true} suppressContentEditableWarning={true}>
          {"do quyet chien"}
        </p>
        <p className={classes.location} contentEditable={true} suppressContentEditableWarning={true}>
          nhan vien kinh doanh
        </p>
        {/* <Box className={classes.imageBox}></Box> */}
        <UploadImageInput
          //   className={classes.imageBox}
          wrapperClassName={classes.imageBox}
          iconClassName={classes.iconClassName}
          imageClassName={classes.image}
          onChangeImage={handleChangeImage}
        />
      </Box>
      <Box className={classes.leftColumn}>
        <InfoUser />
        <MySkills />
        <MyFavorite />
        <Qualification />
      </Box>
      <Box className={classes.rightColumn}>
        <MyTarget />
        <MyEducation />
        <MyEducation />
        <MyEducation />
      </Box>
    </Box>
  );
};

export default MainCv;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    position: "relative",
    display: "flex",
    width: 794,
    minHeight: 1123,
  },
  leftColumn: {
    backgroundColor: "#2a3743",
    width: 300,
    height: "100%",
    padding: "200px 16px 0px",
    minHeight: 1123,
  },
  rightColumn: {
    flex: 1,
    backgroundColor: "#eeeeee",
    padding: "200px 56px 0px 16px",
    height: "100%",
    minHeight: 1123,
  },
  info: {
    position: "absolute",
    top: 40,
    left: 0,
    width: "100%",
    height: 150,
    backgroundColor: "#548ca8",
    padding: "40px 24px",
  },
  name: {
    margin: 0,
    color: "white",
    fontSize: 32,
    fontWeight: 700,
    textTransform: "uppercase",
    width: "fit-content",
  },
  location: {
    width: "fit-content",
    margin: "16px 0px 0px",
    color: "white",
    fontSize: 20,
    fontWeight: 500,
    textTransform: "uppercase",
  },
  imageBox: {
    position: "absolute",
    top: -5,
    right: 50,
    width: 160,
    height: 160,
    borderRadius: "50%",
    border: "5px solid #fff",
    backgroundColor: "#f1f1f1",
  },
  iconClassName: {
    margin: 0,
  },
  image: {
    objectFit: "cover",
  },
  logo: {
    position: "absolute",
    bottom:8,
    right:8,
    margin:0,
    fontSize:12,
    fontWeight:700
  },
}));
