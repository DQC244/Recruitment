import { makeStyles } from "@mui/styles";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { ThemeProps } from "models/types";
import React from "react";
import HOC from "./HOC";
import clsx from "clsx";

const MyEducation = ({ data }: any) => {
  const classes = useStyles();

  return (
    <HOC>
      <div className={clsx("education", classes.root)}>
        <p
          className={clsx(classes.title)}
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          {data?.title || "Học vấn"}
        </p>
        <HOC>
          <div className="education-item">
            <p
              contentEditable={true}
              suppressContentEditableWarning={true}
              className={clsx("name", classes.name)}
            >
              {data?.name || "Đại học"}
            </p>
            <p
              contentEditable={true}
              suppressContentEditableWarning={true}
              className={classes.desc}
            >
              {data?.label || "Quản trị Doanh nghiệp (10/2010-5/2014) :"}
            </p>
            <p
              contentEditable={true}
              suppressContentEditableWarning={true}
              className={classes.desc}
            >
              {data?.desc || "- Tốt nghiệp loại Giỏi, điểm trung bình 8.0"}
            </p>
          </div>
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

export const MyEducationPdf = ({ children, title }: any) => {
  const styles = StyleSheet.create({
    root: {
      fontFamily: "Inter Tight",
      padding: "16px 16px 16px 0px",
    },
    title: {
      fontSize: 20,
      fontWeight: 700,
      margin: 0,
      textTransform: "uppercase",
    },
  });
  return (
    <View style={styles.root} >
      <Text style={styles.title}>{title || ""}</Text>
      {children}
    </View>
  );
};

export const MyEducationItemPdf = ({ data }: any) => {
  const styles = StyleSheet.create({
    name: {
      margin: "0px 0px 0px 12px",
      fontWeight: 800,
      fontSize: 14,
    },
    desc: {
      fontSize: 12,
      fontWeight: 400,
      margin: "8px 0px 0px 12px",
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
            backgroundColor: "black",
          }}
        ></View>
        <Text style={styles.name}>{data?.name}</Text>
      </View>
      <Text style={styles.desc}>{data?.label}</Text>
      <Text style={styles.desc}>{data?.desc}</Text>
    </View>
  );
};
