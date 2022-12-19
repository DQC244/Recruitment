import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import React from "react";

const Qualification = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <p contentEditable={true} suppressContentEditableWarning={true} className={classes.title}>
        CHỨNG CHỈ
      </p>
      <div className={classes.itemWrapper}>
        <p className={classes.year} contentEditable={true} suppressContentEditableWarning={true}>
          2020:
        </p>
        <p className={classes.desc} contentEditable={true} suppressContentEditableWarning={true}>
          Giải nhất Tài năng{" "}
        </p>
      </div>
    </div>
  );
};

export default Qualification;

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
  itemWrapper: {
    display: "flex",
    alignItems: "flex-start",
    marginTop: 8,
  },
  year: {
    fontSize: 14,
    lineHeight: "14px",
    margin: "0px 4px 0px 0px",
  },
  desc: {
    fontSize: 12,
    fontWeight: 400,
    margin: 0,
    lineHeight: "14px",
  },
}));
