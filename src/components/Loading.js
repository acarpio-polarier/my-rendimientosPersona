import React from "react";

//Images
import { View, StyleSheet, Image } from "react-native";
import { TextElement as Text } from "./Text";
import LottieView from "lottie-react-native";

export class Loading extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { textProps, animationProps, imageProps, blur, backgroundColor } =
      this.props;

    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          blur ? { backgroundColor: "rgba(255, 255, 255, 0.7)" } : {},
          backgroundColor && { backgroundColor },
        ]}
      >
        <View style={[styles.splashContainer]}>
          {imageProps && <Image {...imageProps} />}
          {animationProps && (
            <LottieView
              ref={(animation) => {
                this.animation = animation;
              }}
              style={styles.animation}
              loop={true}
              autoPlay
              resizeMode="contain"
              {...animationProps}
            />
          )}
          {textProps && (
            <View style={styles.titleBox}>
              <Text
                header
                primary
                semiBold
                {...textProps}
                style={{ textAlign: "center" }}
              >
                {textProps.text}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    height: undefined,
    aspectRatio: 12 / 4,
  },
  animation: {
    height: 300,
    aspectRatio: 1,
  },
  titleBox: {
    alignItems: "center",
    marginVertical: 25,
    paddingHorizontal: 50,
  },
});
