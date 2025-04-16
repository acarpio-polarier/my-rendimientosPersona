import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import token from "../fotos/token.png";
import { colors } from "../../../styles/base";

const HeaderCanje = ({ dataTokens }) => {
  return (
    <View style={styles.contenedorMain}>
      <View>
        <View style={styles.contenedorToken}>
          <Image style={styles.tokenIcono} source={token} />
          <Text style={styles.tokenLabel}>Tokens: {dataTokens}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedorMain: {
    width: "100%",
    alignSelf: "center",
    overflow: "hidden",
    marginVertical: 10,
    fontFamily: "Arial",
  },
  contenedorToken: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "end",
  },
  tokenIcono: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  tokenLabel: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    right: 10,
    color: colors.lightBlack,
    fontSize: 15,
  },
});

export default HeaderCanje;
