import { createMuiTheme } from "@material-ui/core";

export const drawerWidth = 260;

const navyBlue = "#1458EA";
const navyBlueDarker = "#182C49";
const navyBlueLighter = "#8492A6";
const green = "#20CF7E";
const mainText = "#001738";
const background = "#F5F6F8";
const border = "#E5E9F2";
const darkGray = "#8492A6";
const lightGray = "#F9FAFC";
const orange = "#FF7D50";
const boldOrange = "#F6891F";
const gray="#C4C4C4"
const pink = "#FF007F";
const purple = "#8338EC";
const red = "#FF0046";
const yellow = "#FFBE0B";
const black="#333333"
const lightDark="#EBEBEB"
const boldRed='#FF0000'

const theme = createMuiTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: navyBlue,
    },
    secondary: {
      main: green,
    },
    text: {
      primary: mainText,
    },
    background: {
      default: background,
      paper: background,
    },
    divider: border,
  },
  typography: {
    fontFamily: "Iran Yekan",
  },
  transitions: {
    common: "all 300ms cubic-bezier(0.685, 0.0473, 0.346, 1)",
    linkActive: "all 100ms linear",
  },
  container: {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
  },
  // ##############################
  // // // Variables
  // #############################
  color: {
    boldRed,
    black,
    gray,
    boldOrange,
    navyBlue,
    navyBlueDarker,
    navyBlueLighter,
    green,
    mainText,
    background,
    border,
    darkGray,
    lightGray,
    orange,
    pink,
    purple,
    red,
    yellow,
  },
  font: {
    s20w900: { fontSize: 20, fontWeight: 900 },
    s20w700: { fontSize: 20, fontWeight: 700 },
    s20w500: { fontSize: 20, fontWeight: 500 },
    s18w800: { fontSize: 18, fontWeight: 800 },
    s18w700: { fontSize: 18, fontWeight: 700 },
    s16w900: { fontSize: 16, fontWeight: 900 },
    s16w700: { fontSize: 16, fontWeight: 700 },
    s16w600: { fontSize: 16, fontWeight: 600 },
    s16w500: { fontSize: 16, fontWeight: 500 },
    s16w400: { fontSize: 16, fontWeight: 400 },
    s14w700: { fontSize: 14, fontWeight: 700 },
    s14w600: { fontSize: 14, fontWeight: 600 },
    s14w500: { fontSize: 14, fontWeight: 500 },
    s14w400: { fontSize: 14, fontWeight: 400 },
    s14w300: { fontSize: 14, fontWeight: 300 },

    s12w700: { fontSize: 12, fontWeight: 700 },
    s12w600: { fontSize: 12, fontWeight: 600 },
    s12w500: { fontSize: 12, fontWeight: 500 },
    s12w400: { fontSize: 12, fontWeight: 400 },
    s10w700: { fontSize: 10, fontWeight: 700 },

  },
  boxShadows: {
    common:
      "0 10px 30px -12px rgb(0 0 0 / 42%), 0 4px 25px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%)",
  },
});

export default theme;
