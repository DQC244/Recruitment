import MuiContainer from "./MuiContainer";
import MuiButton from "./MuiButton";
import MuiIconButton from "./MuiIconButton";
import MuiAlert from "./MuiAlert";
import MuiFormControlLabel from "./MuiFormControlLabel";
import { Components, Theme } from "@mui/material";

const components: Components<Omit<Theme, "components">> = {
  MuiContainer,
  MuiButton,
  MuiIconButton,
  MuiFormControlLabel,
  MuiAlert,
};

export default components;
