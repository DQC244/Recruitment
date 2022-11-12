const white = "#FFFFFF";
const black = "#172123";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TPalette = Record<string, any> & { mode: "light" | "dark" };

const palette: TPalette = {
  mode: "dark",
  common: {
    black,
    white,
  },
  primary: {
    main: "#2960B0",
    light: "#9FC7FF",
    dark: "#102A7D",
    contrastText: white,
  },
  secondary: {
    main: "#F3C917",
    light: "#F8DC7E",
    dark: "#D3951B",
    contrastText: white,
  },
  error: {
    dark: "#A93131",
    light: "#FF9F9F",
    main: "#FF6F6F",
    contrastText: white,
  },
  warning: {
    main: "#FCFF62",
    light: "",
    dark: "#D3B239",
    contrastText: white,
  },
  // info: {
  //   main: "",
  //   light: "",
  //   dark: "",
  //   contrastText: "",
  // },
  success: {
    main: "#6AD74F",
    light: "",
    dark: "",
    contrastText: black,
  },
  link: {
    primary: "",
    secondary: "#55A1FF",
    link: "#2C8CFF", // rgb 44, 140, 255
  },
  grey: {
    50: "",
    100: "#D3D5DA",
    200: "#B8BCC6",
    300: "rgba(255, 255, 255, 0.6)",
    400: "rgba(255, 255, 255, 0.4)",
    500: "rgba(255, 255, 255, 0.3)",
    600: "rgba(255, 255, 255, 0.2)",
    700: "rgba(255, 255, 255, 0.1)",
    800: "rgba(255, 255, 255, 0.08)",
    900: "linear-gradient(180deg, rgba(255, 255, 255, 0.0798) 85.21%, rgba(255, 255, 255, 0.1) 100%)",
    A100: "#081129",
    A200: "rgba(8, 17, 41, 0.8)",
    A400: "rgba(8, 17, 41, 0.4)",
    A700: "rgba(8, 17, 41, 0.3)",
  },
  text: {
    primary: white,
    secondary: "rgba(255, 255, 255, 0.4)",
    disabled: "rgba(255, 255, 255, 0.6)",
    icon: "",
  },
  divider: "",
  background: {
    default: "linear-gradient(90deg, #09245B 0%, #1B3271 36.25%, #1B3271 59.17%, #09245B 100%)",
    paper: "#152E86",
  },
  action: {},
  gradient: {},
  shadow: {
    disabled: "#565861",
    primary: "#2D49A0",
    secondary: "#8E5D24",
  },
};

export default palette;
