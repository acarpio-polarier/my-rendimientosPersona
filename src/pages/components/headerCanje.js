import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

const HeaderCanje = () => {
  return (
    <View style={styles.contenedor}>
      <View>
        <View>
          <Text style={styles.tokens}>€ Tokens: 100</Text>
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
  tokens: {
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
