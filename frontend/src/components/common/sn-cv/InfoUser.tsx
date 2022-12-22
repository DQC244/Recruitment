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
import clsx from "clsx";
import { Path, StyleSheet, Svg, Text, View } from "@react-pdf/renderer";

const InfoUser = () => {
  const classes = useStyles();

  return (
    <Box className={clsx("info", classes.root)}>
      <Box className={classes.wrapper}>
        <UserIcon />
        <p
          className={classes.text}
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          Nam
        </p>
      </Box>
      <Box className={classes.wrapper}>
        <CalenderIcon />
        <p
          className={classes.text}
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          19/05/1992
        </p>
      </Box>
      <Box className={classes.wrapper}>
        <PhoneIcon />
        <p
          className={classes.text}
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          0961874818
        </p>
      </Box>
      <Box className={classes.wrapper}>
        <EmailIcon className={classes.icon} />
        <p
          className={classes.text}
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          chien@gmail.com
        </p>
      </Box>
      <Box className={classes.wrapper}>
        <NetworkIcon />
        <p
          className={classes.text}
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          https://fb.com/topcv.vn
        </p>
      </Box>
      <Box className={classes.wrapper}>
        <LocationIcon />
        <p
          className={classes.text}
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
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

export const DescInformationPdf = ({ data }: any) => {
  const styles = StyleSheet.create({
    root: {
      padding: "16px 0px",
      color: "white",
      fontWeight: 700,
      fontFamily: "Inter Tight",
    },
    text: {
      margin: "0px 0px 0px 16px",
      maxWidth: "90%",
    },
    wrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,

      "&:first-child": {
        marginTop: 0,
      },
    },
  });

  return (
    <View style={styles.root}>
      <View style={styles.wrapper}>
        <Svg width={16} height={16} viewBox="0 0 32 32">
          <Path
            d="M16 20C20.4183 20 24 16.4183 24 12C24 7.58172 20.4183 4 16 4C11.5817 4 8 7.58172 8 12C8 16.4183 11.5817 20 16 20Z"
            stroke="white"
            fill="#2a3743"
            strokeWidth="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M3.875 27C5.10367 24.8714 6.87104 23.1038 8.99944 21.8749C11.1278 20.6459 13.5423 19.9989 16 19.9989C18.4577 19.9989 20.8722 20.6459 23.0006 21.8749C25.129 23.1038 26.8963 24.8714 28.125 27"
            stroke="white"
            fill="#2a3743"
            strokeWidth="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </Svg>
        <Text style={styles.text}>{data?.sex}</Text>
      </View>
      <View style={styles.wrapper}>
        <Svg width={16} height={16} viewBox="0 0 32 32">
          <Path
            d="M26 5H6C5.44772 5 5 5.44772 5 6V26C5 26.5523 5.44772 27 6 27H26C26.5523 27 27 26.5523 27 26V6C27 5.44772 26.5523 5 26 5Z"
            stroke="white"
            fill="#2a3743"
            strokeWidth="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M22 3V7"
            stroke="white"
            fill="#2a3743"
            strokeWidth="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M10 3V7"
            stroke="white"
            fill="#2a3743"
            strokeWidth="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M5 11H27"
            stroke="white"
            fill="#2a3743"
            strokeWidth="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </Svg>
        <Text style={styles.text}>{data?.birthday}</Text>
      </View>
      <View style={styles.wrapper}>
        <Svg width={16} height={16} viewBox="0 0 32 32">
          <Path
            d="M11.5625 15.6C12.5915 17.725 14.3098 19.4389 16.4375 20.4625C16.5944 20.5368 16.768 20.569 16.9412 20.5558C17.1143 20.5427 17.2811 20.4846 17.425 20.3875L20.55 18.3C20.6881 18.2063 20.8476 18.1492 21.0137 18.1339C21.1799 18.1186 21.3472 18.1456 21.5 18.2125L27.35 20.725C27.5499 20.8082 27.717 20.9548 27.8254 21.1423C27.9338 21.3298 27.9776 21.5477 27.95 21.7625C27.7646 23.2097 27.0582 24.5397 25.9631 25.5037C24.8679 26.4677 23.459 26.9997 22 27C17.4913 27 13.1673 25.2089 9.97919 22.0208C6.79107 18.8327 5 14.5087 5 9.99998C5.00033 8.54098 5.53227 7.13208 6.49628 6.03692C7.4603 4.94177 8.79033 4.2354 10.2375 4.04998C10.4523 4.02239 10.6702 4.06617 10.8577 4.17459C11.0452 4.28301 11.1918 4.45004 11.275 4.64998L13.7875 10.5125C13.8528 10.6629 13.8802 10.8271 13.8671 10.9906C13.854 11.1541 13.8009 11.3118 13.7125 11.45L11.625 14.625C11.5321 14.7686 11.4775 14.9336 11.4666 15.1043C11.4556 15.275 11.4887 15.4457 11.5625 15.6V15.6Z"
            stroke="white"
            fill="#2a3743"
            strokeWidth="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </Svg>
        <Text style={styles.text}>{data?.phone}</Text>
      </View>
      <View style={styles.wrapper}>
        <Svg width={16} height={16} viewBox="0 0 32 32">
          <Path
            d="M4 7H28V24C28 24.2652 27.8946 24.5196 27.7071 24.7071C27.5196 24.8946 27.2652 25 27 25H5C4.73478 25 4.48043 24.8946 4.29289 24.7071C4.10536 24.5196 4 24.2652 4 24V7Z"
            stroke="white"
            fill="#2a3743"
            strokeWidth="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M28 7L16 18L4 7"
            stroke="white"
            fill="#2a3743"
            strokeWidth="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </Svg>
        <Text style={styles.text}>{data?.gmail}</Text>
      </View>
      <View style={styles.wrapper}>
        <Svg width={16} height={16} viewBox="0 0 32 32">
          <Path
            d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
            stroke="white"
            fill="#2a3743"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M4 16H28"
            stroke="white"
            fill="#2a3743"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M16 27.6749C18.7614 27.6749 21 22.4479 21 16C21 9.55203 18.7614 4.32495 16 4.32495C13.2386 4.32495 11 9.55203 11 16C11 22.4479 13.2386 27.6749 16 27.6749Z"
            stroke="white"
            fill="#2a3743"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </Svg>
        <Text style={styles.text}>{data?.web}</Text>
      </View>
      <View style={styles.wrapper}>
        <Svg width={16} height={16} viewBox="0 0 32 32">
          <Path
            d="M7 29H25"
            stroke="white"
            fill="#2a3743"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M16 17C18.2091 17 20 15.2091 20 13C20 10.7909 18.2091 9 16 9C13.7909 9 12 10.7909 12 13C12 15.2091 13.7909 17 16 17Z"
            stroke="white"
            fill="#2a3743"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M26 13C26 22 16 29 16 29C16 29 6 22 6 13C6 10.3478 7.05357 7.8043 8.92893 5.92893C10.8043 4.05357 13.3478 3 16 3C18.6522 3 21.1957 4.05357 23.0711 5.92893C24.9464 7.8043 26 10.3478 26 13V13Z"
            stroke="white"
            fill="#2a3743"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </Svg>
        <Text style={styles.text}>{data?.location}</Text>
      </View>
    </View>
  );
};
