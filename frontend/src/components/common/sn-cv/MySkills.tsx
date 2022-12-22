import { makeStyles } from "@mui/styles";
import { Font, StyleSheet, Text, View } from "@react-pdf/renderer";
import { ThemeProps } from "models/types";
import React from "react";
import HOC from "./HOC";
Font.register({
  family: "Inter Tight",
  fonts: [
    { src: "fonts/InterTight-Medium.ttf", fontWeight: 500 },
    { src: "fonts/InterTight-Regular.ttf", fontWeight: 400 },
    { src: "fonts/InterTight-SemiBold.ttf", fontWeight: 600 },
  ],
});
import clsx from "clsx";

const MySkills = () => {
  const classes = useStyles();

  return (
    <HOC>
      <div className={clsx("skill", classes.root)}>
        <p
          contentEditable={true}
          suppressContentEditableWarning={true}
          className={classes.title}
        >
          Các kỹ năng
        </p>
        <HOC>
          <div>
            <p
              contentEditable={true}
              suppressContentEditableWarning={true}
              className={classes.name}
            >
              Tiếng Anh
            </p>
            <p
              contentEditable={true}
              suppressContentEditableWarning={true}
              className={classes.desc}
            >
              - Khả năng giao tiếp Tiếng Anh trôi chảy
            </p>
          </div>
        </HOC>
      </div>
    </HOC>
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

export const MySkillsPdf = ({ children, title }: any) => {
  const styles = StyleSheet.create({
    root: {
      fontFamily: "Inter Tight",
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
  });
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

export const MySkillsItemPdf = ({ data }: any) => {
  const styles = StyleSheet.create({
    name: {
      margin: "0px",
    },
    desc: {
      fontSize: 12,
      fontWeight: 400,
      margin: 0,
    },
  });
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          margin: "8px 0px 0px 0px",
        }}
      >
        <View
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            backgroundColor: "white",
          }}
        ></View>
        <Text style={styles.name}>{data?.title}</Text>
      </View>
      <Text style={styles.desc}>{data?.desc}</Text>
    </View>
  );
};
