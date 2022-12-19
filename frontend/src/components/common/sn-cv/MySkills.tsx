import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import React from "react";

const MySkills = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p className={classes.title}>Các kỹ năng</p>
      <p contentEditable={true} suppressContentEditableWarning={true} className={classes.name}>
        Tiếng Anh
      </p>
      <p contentEditable={true} suppressContentEditableWarning={true} className={classes.desc}>
        - Khả năng giao tiếp Tiếng Anh trôi chảy
      </p>
      <p contentEditable={true} suppressContentEditableWarning={true} className={classes.name}>
        Tiếng Anh
      </p>
      <p contentEditable={true} suppressContentEditableWarning={true} className={classes.desc}>
        - Khả năng giao tiếp Tiếng Anh trôi chảy
      </p>
      <p contentEditable={true} suppressContentEditableWarning={true} className={classes.name}>
        Tiếng Anh
      </p>
      <p contentEditable={true} suppressContentEditableWarning={true} className={classes.desc}>
        - Khả năng giao tiếp Tiếng Anh trôi chảy
      </p>
    </div>
  );
};

export default MySkills;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    padding: "16px 0px",
    color: "white",
    fontWeight: 700,
    borderTop: "2px solid white",
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    margin: 0,
    textTransform: "uppercase",
  },
  name: {
    display: "list-item",
    margin: "8px 0px 0px 12px",
  },
  desc: {
    fontSize: 12,
    fontWeight: 400,
    margin: 0,
    lineHeight: "14px",
  },
}));
