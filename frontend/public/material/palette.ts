const white = "#FFFFFF";
const black = "#000000";

type TPalette = Record<string, any> & { mode: "light" | "dark" };

const palette: TPalette = {
  mode: "light",
  common: {
    black,
    white,
  },
  primary: {
    main: "#303af7",
    light: "#4e57f9",
    dark: "#102A7D",
    contrastText: black,
  },
  secondary: {
    main: "#fe9703",
    light: "#0D1628",
    dark: "#D3951B",
    contrastText: black,
  },
  error: {
    dark: "#A93131",
    light: "#FF9F9F",
    main: "#d32f2f",
    contrastText: black,
    1: "#FF7875",
    2: "#FF4D4F",
    3: "#F5222D",
    4: "#CF1322",
    5: "#A8071A",
  },
  warning: {
    main: "#ed6c02",
    light: "#ff9800",
    dark: "#D3B239",
    contrastText: black,
    1: "#FFF566",
    2: "#FFEC3D",
    3: "#FADB14",
    4: "#D4B106",
    5: "#AD8B00",
  },
  info: {
    main: "#0288d1",
    light: "#03a9f4",
    dark: "#01579b",
    contrastText: black,
    1: "#85A5FF",
    2: "#85A5FF",
    3: "#2F54EB",
    4: "#1D39C4",
    5: "#10239E",
  },
  success: {
    main: "#2ecc71",
    light: "#4caf50",
    dark: "#1b5e20",
    contrastText: black,
    1: "#95DE64",
    2: "#73D13D",
    3: "#52C41A",
    4: "#389E0D",
    5: "#237804",
  },
  grey: {
    50: "#fafafa",
    100: "#F5F5F5",
    200: "#F0F0F0",
    300: "#D9D9D9",
    400: "#BFBFBF",
    500: "#8C8C8C",
    600: "#434343",
    700: "#262626",
    800: "#141414",
    900: "#212121",
    A100: "#f5f5f5",
    A200: "#eeeeee",
    A400: "#bdbdbd",
    A700: "#616161",
    A800: "#5E5E5E",
    A900: "#3D3D3D",
  },
  text: {
    primary: black,
    secondary: black,
    disabled: "rgba(255, 255, 255, 0.6)",
    light8: "rgba(255, 255, 255, 0.8)",
    light7: "rgba(255, 255, 255, 0.7)",
  },
  divider: "rgba(0, 0, 0, 0.12)",
  background: {
    default:
      "linear-gradient(90deg, #09245B 0%, #1B3271 36.25%, #1B3271 59.17%, #09245B 100%)",
    paper: "white",
  },
  gradient: {
    default: "linear-gradient(266.5deg, #6626CF 0%, #8C53EF 100%)",
    hover: "linear-gradient(266.5deg, #5D11DB 0%, #8649EE 100%)",
    disable: "linear-gradient(266.5deg, #515151 0%, #6D6D6D 100%)",
  },
  shadow: {
    disabled: "#565861",
    primary: "#2D49A0",
    secondary: "#8E5D24",
  },
};

export default palette;
