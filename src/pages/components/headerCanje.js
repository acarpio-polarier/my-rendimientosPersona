import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

const HeaderCanje = () => {
  return (
    <View style={styles.contenedor}>
      <View>
        <View>
          <Text style={styles.tokens}>€ Tokens</Text>
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
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    overflow: "hidden",
    marginVertical: 10,
    fontFamily: "Arial",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  tokens: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    right: 10,
  },
  labelFiltro: {
    left: 10,
    marginBottom: 10,
  },
});

export default HeaderCanje;
