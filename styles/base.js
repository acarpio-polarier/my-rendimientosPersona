import { Dimensions, Platform } from "react-native";

export const colors = {
  primary: "#EDB637",
  primary_light: "#EEC567",
  primary_bright: "rgb(249,232,191)",
  secondary: "rgb(210,210,210)",
  danger: "#d92550",
  warning: "#ffbb33",
  success: "#3ac47d",
  blue: "#52A3FF",
  orange: "#FF9152",
  info: "#70d7c7",
  white: "#fff",
  smokedWhite: "rgb(245,245,245)",
  lightGray: "rgb(229,229,229)",
  gray: "rgb(160,160,160)",
  black: "#212121",
  darkGray: "rgb(129,129,129)",
  lightBlack: "rgb(64,64,64)",
  red: "rgb(255,74,92)",
  transparent: "rgba(0,0,0,0)",
};

export const DEVICE_HEIGHT = Dimensions.get("window").height;
export const DEVICE_WIDTH = Dimensions.get("window").width;
export const NAV_HEIGHT =
  Platform.OS === "ios" ? DEVICE_HEIGHT * 0.1 : DEVICE_HEIGHT * 0.08;
export const TAB_HEIGHT = 50;
export const PAGE_PADDING = 10;
export const MARGIN_HORIZONTAL = 15;
export const ITEM_MARGIN_VERTICAL = 10;
export const BOTTOM_TABBAR_HEIGHT = 80;

//FORMS
export const FORM_ITEM_HEIGHT = 55;
export const FORM_ITEM_MARGIN_VERTICAL = 15;

//BUTTON
export const BUTTON_HEIGHT = 45;

export const fontFamily = {
  light: "Roboto_Light",
  regular: "Roboto_Regular",
  medium: "Roboto_Medium",
  semiBold: "Roboto_SemiBold",
  extraBold: "Roboto_Bold",
};

export let fontSize = {
  extraLarge: 32,
  title: 30,
  bigHeader: 25,
  header: 18,
  itemHeader: 17,
  medium: 16,
  normal: 15,
  small: 13,
  button: 18,
  textInput_header: 12,
};

export let lineHeight = {
  title: 38,
  bigHeader: 35,
  header: 30,
  itemHeader: 29,
  normal: 23,
  small: 18,
  textInput_header: 14,
};

export const primaryGradient = {
  colors: [colors.primary, colors.primary_bright],
  colorsStart: { x: 0.2, y: 0.4 },
  colorsEnd: { x: 1.0, y: 1.0 },
};

// if (deviceWidth <= 320) {
//     fontSize = {
//         extraLarge: 27,
//         title: 20,
//         header: 16,
//         itemHeader: 14,
//         medium: 12,
//         normal: 11,
//         small: 10
//     }

//     lineHeight = {
//         title: 28,
//         header: 20,
//         itemHeader: 19,
//         normal: 13,
//         small: 20
//     }
// }

// export const padding = {
//     sm: 10,
//     md: 20,
//     lg: 30,
//     xl: 40
//   }
