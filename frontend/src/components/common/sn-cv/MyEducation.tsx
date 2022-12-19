import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import React from "react";
import HOC from "./HOC";

const MyEducation = () => {
  const classes = useStyles();

  return (
    <HOC>
      <div className={classes.root}>
        <p className={classes.title} contentEditable={true} suppressContentEditableWarning={true}>
          Học vấn
        </p>
        <HOC>
          <p contentEditable={true} suppressContentEditableWarning={true} className={classes.name}>
            Đại học
          </p>
          <p contentEditable={true} suppressContentEditableWarning={true} className={classes.desc}>
            Quản trị Doanh nghiệp (10/2010-5/2014) :
          </p>
          <p contentEditable={true} suppressContentEditableWarning={true} className={classes.desc}>
            - Tốt nghiệp loại Giỏi, điểm trung bình 8.0
          </p>
        </HOC>
      </div>
    </HOC>
  );
};

export default MyEducation;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    padding: "16px 16px 16px 0px",
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
    fontWeight: 800,
    fontSize: 14,
  },
  desc: {
    marginTop: 8,
    marginLeft: 16,
    fontSize: 12,
    fontWeight: 400,
    margin: 0,
    lineHeight: "14px",
  },
}));
