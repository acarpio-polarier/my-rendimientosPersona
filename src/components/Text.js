import React, { Component } from "react";
import { Text } from "react-native";
import { colors, fontFamily, fontSize, lineHeight } from "../../styles/base";

export class TextElement extends Component {
  constructor(props) {
    super(props);
  }

  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  };

  render() {
    return (
      <Text
        ref={(component) => (this._root = component)}
        allowFontScaling={false}
        {...this.props}
        style={[
          this.props.extraLarge && {
            fontSize: fontSize.extraLarge,
          },
          this.props.title && {
            fontSize: fontSize.title,
            lineHeight: lineHeight.title,
          },
          this.props.bigHeader && {
            fontSize: fontSize.bigHeader,
            lineHeight: lineHeight.bigHeader,
          },
          this.props.header && {
            fontSize: fontSize.header,
            lineHeight: lineHeight.header,
          },
          this.props.itemHeader && {
            fontSize: fontSize.itemHeader,
            lineHeight: lineHeight.itemHeader,
          },
          this.props.medium && {
            fontSize: fontSize.medium,
          },
          this.props.normal && {
            fontSize: fontSize.normal,
            lineHeight: lineHeight.normal,
          },
          this.props.small && {
            fontSize: fontSize.small,
            lineHeight: lineHeight.small,
          },
          this.props.textInput_header && {
            fontSize: fontSize.textInput_header,
            lineHeight: lineHeight.textInput_header,
          },

          this.props.light && { fontFamily: fontFamily.light },
          this.props.regular && { fontFamily: fontFamily.regular },
          this.props.mediumBold && { fontFamily: fontFamily.medium },
          this.props.semiBold && { fontFamily: fontFamily.semiBold },
          this.props.extraBold && { fontFamily: fontFamily.extraBold },

          this.props.capitalize_ && { textTransform: "capitalize" },
          this.props.uppercase_ && { textTransform: "uppercase" },
          this.props.right_ && { textAlign: "right" },
          this.props.center_ && { textAlign: "center" },

          this.props.bold && { fontWeight: "bold" },
          this.props.normalWeight && { fontWeight: "normal" },
          this.props.underLine && { textDecorationLine: "underline" },
          this.props.noneUnderline && { textDecorationLine: "none" },

          this.props.primary && { color: colors.primary },
          this.props.secondary && { color: colors.secondary },
          this.props.danger && { color: colors.danger },
          this.props.warning && { color: colors.warning },
          this.props.success && { color: colors.success },
          this.props.info && { color: colors.info },
          this.props.white && { color: colors.white },
          this.props.lightGray && { color: colors.lightGray },
          this.props.gray && { color: colors.gray },
          this.props.darkGray && { color: colors.darkGray },
          this.props.lightBlack && { color: colors.lightBlack },

          this.props.style && this.props.style,
        ]}
      >
        {this.props.children}
      </Text>
    );
  }
}
