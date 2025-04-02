import { colors } from "./base";

import MainStyles from "./mainStyles";

import { DefaultTheme } from "react-native-paper";

let lightTheme = {
  mode: "light",
  PRIMARY_BACKGROUND_COLOR: colors.smokedWhite,
  MAIN_MENU_BACKGROUND_COLOR: colors.white,

  PRIMARY_TEXT_COLOR: colors.darkGray,
  DEFAULT_TEXT_COLOR: colors.secondary,
  ICON_COLOR: colors.darkGray,
  ICON_BACKGROUND_COLOR: colors.lightGray,

  PRIMARY_BUTTON_COLOR: colors.primary,
  PRIMARY_BUTTON_TEXT_COLOR: colors.white,

  STATUS_BAR_BACKGROUND: colors.primary,
  STATUS_BAR_TEXT: colors.white,

  BORDER_COLOR: colors.lightGray,
  SHADOW_COLOR: "rgba(0,0,0,1)",

  CARD_BACKGROUND: colors.white,
  CARD_BACKGROUND_HEADER: colors.smokedWhite,

  paperTheme: {
    ...DefaultTheme,
    dark: false,
    roundness: 4,
    colors: {
      primary: colors.primary,
      accent: colors.secondary,
      background: colors.white,
      //surface: colors.white,
      error: colors.danger,
      text: colors.darkGray,
      onSurface: "#000000",
      disabled: colors.primary,
      placeholder: colors.gray,
      backdrop: colors.smokedWhite,
      //   notification: pinkA400,
    },
    // fonts: configureFonts(),
    // animation: {
    //   scale: 1.0,
    // },
  },
};

lightTheme.styles = { ...MainStyles(lightTheme) };

let darkTheme = {
  ...DefaultTheme,
  mode: "dark",
  PRIMARY_BACKGROUND_COLOR: colors.lightBlack,
  MAIN_MENU_BACKGROUND_COLOR: colors.black,

  PRIMARY_TEXT_COLOR: colors.primary,
  DEFAULT_TEXT_COLOR: colors.secondary,
  ICON_COLOR: colors.white,
  ICON_BACKGROUND_COLOR: colors.primary,

  PRIMARY_BUTTON_COLOR: colors.primary,
  PRIMARY_BUTTON_TEXT_COLOR: colors.white,

  STATUS_BAR_BACKGROUND: colors.lightBlack,
  STATUS_BAR_TEXT: colors.primary,

  BORDER_COLOR: colors.primary,
  SHADOW_COLOR: "rgba(255,255,255,0.8)",

  CARD_BACKGROUND: colors.smokedWhite,
  CARD_BACKGROUND_HEADER: colors.darkGray,

  paperTheme: {
    ...DefaultTheme,
    dark: false,
    colors: {
      primary: colors.black,
      accent: colors.primary,
      background: colors.black,
      error: colors.danger,
      text: colors.smokedWhite,
    },
  },
};

darkTheme.styles = { ...MainStyles(darkTheme) };

export { lightTheme };
export { darkTheme };
