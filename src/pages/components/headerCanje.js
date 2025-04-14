import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import token from "../fotos/token.png";

const HeaderCanje = ({ dataTokens }) => {
  return (
    <View style={styles.contenedor}>
      <View>
        <View style={styles.contenedorToken}>
          <Image style={styles.token} source={token} />
          <Text style={styles.tokenLabel}>
            Tokens: {dataTokens[0]?.cantidad}
          </Text>
        </View>
        <Text style={styles.labelFiltro}>Filtros</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    width: "100%",
    alignSelf: "center",
    overflow: "hidden",
    marginVertical: 10,
    fontFamily: "Arial",
    borderBottomWidth: 1,
    borderBottomColor: "rgb(210,210,210)",
  },
  contenedorToken: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "end",
  },
  token: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  tokenLabel: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    right: 10,
    color: "rgb(160,160,160)",
  },
  labelFiltro: {
    left: 10,
    marginBottom: 5,
    fontSize: 12,
    color: "rgb(160,160,160)",
  },
});

export default HeaderCanje;
