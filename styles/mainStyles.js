import { StyleSheet, Platform } from "react-native";

import {
    DEVICE_WIDTH,
    NAV_HEIGHT,
    TAB_HEIGHT,
    PAGE_PADDING,
    MARGIN_HORIZONTAL,
    ITEM_MARGIN_VERTICAL,
    FORM_ITEM_HEIGHT,
    BOTTOM_TABBAR_HEIGHT,
    BUTTON_HEIGHT,
    fontFamily,
    fontSize,
    colors,
} from "./base";

export const safeWidth = {
    width: DEVICE_WIDTH - PAGE_PADDING * 2,
    marginLeft: PAGE_PADDING,
};

export default (theme) => {
    const shadowStyle = {
        ...Platform.select({
            ios: {
                shadowColor: theme.SHADOW_COLOR,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.26,
                shadowRadius: 2,
                zIndex: 2,
            },
            android: {
                shadowColor: theme.SHADOW_COLOR,
                elevation: 5,
            },
        }),
    };

    const smallShadowStyle = {
        ...Platform.select({
            ios: {
                shadowColor: theme.SHADOW_COLOR,
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 1.0,
                zIndex: 1,
            },
            android: {
                shadowColor: theme.SHADOW_COLOR,
                elevation: 1,
            },
        }),
    };

    const shadowStyle_warning = {
        ...Platform.select({
            ios: {
                shadowColor: colors.warning,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowRadius: 5,
                shadowOpacity: 1,
            },
            android: {
                shadowColor: colors.warning,
                elevation: 5,
            },
        }),
    };

    const card = {
        ...shadowStyle,
        borderRadius: 8,
        backgroundColor: theme.CARD_BACKGROUND,
        marginBottom: 15,
        overflow: Platform.OS === "android" ? "hidden" : "visible",
    };

    const flexRowCenter = {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    };
    const flexRowLeft = {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    };
    const flexRowRight = {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    };

    return (styles = StyleSheet.create({
        page: {
            flex: 1,
            backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
        },
        lastItem: {
            paddingBottom: BOTTOM_TABBAR_HEIGHT,
        },
        navigationBar: {
            flexDirection: "row",
            height: NAV_HEIGHT,
            backgroundColor: theme.STATUS_BAR_BACKGROUND,
            color: theme.STATUS_BAR_TEXT,
            ...shadowStyle,
        },
        scrollView: {
            marginBottom: TAB_HEIGHT,
            marginTop: 0,
        },
        //FORMS
        textInput: {
            marginBottom: 5,
            backgroundColor: colors.white,
        },
        textInput_disabled: {
            backgroundColor: colors.smokedWhite,
        },
        //BUTTON
        buttonBox: {
            height: BUTTON_HEIGHT + 10,
            width: "100%",
        },
        button: {
            justifyContent: "center",
            alignItems: "center",
            height: BUTTON_HEIGHT,
            width: "100%",
            borderRadius: 20,
        },
        buttonText: {
            fontFamily: fontFamily.semiBold,
            fontSize: fontSize.button,
            color: "#fff",
        },
        //CARD
        card: {
            ...card,
        },
        cardHeader: {
            padding: 5,
            paddingLeft: 15,
            height: 35,
            backgroundColor: theme.CARD_BACKGROUND_HEADER,
            flexDirection: "column",
            justifyContent: "center",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
        },
        card_warning: {
            ...card,
            ...shadowStyle_warning,
            borderColor: colors.warning,
            borderWidth: 1,
        },
        //HELPERS
        shadowStyle: {
            ...shadowStyle,
        },
        smallShadowStyle: {
            ...smallShadowStyle,
        },
        safeWidth: {
            ...safeWidth,
        },
        flexRowCenter: {
            ...flexRowCenter,
        },
        flexRowLeft: {
            ...flexRowLeft,
        },
        flexRowRight: {
            ...flexRowRight,
        },
    }));
};
