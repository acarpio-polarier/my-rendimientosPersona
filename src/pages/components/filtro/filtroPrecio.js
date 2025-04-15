import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";

const FiltroPrecio = () => {
  const [precio, setPrecio] = useState("");

  return (
    <View style={styles.contenedor}>
      <View style={styles.label}>
        <Text>Precio:</Text>
      </View>
      <View style={styles.contenedorTexto}>
        <View style={styles.contenedorPrecio}>
          <Text>Precio más bajo</Text>
          <TextInput style={styles.input} value={precio}></TextInput>
        </View>
        <View style={styles.contenedorPrecio}>
          <Text>Precio más bajo</Text>
          <TextInput style={styles.input} value={precio}></TextInput>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    width: "100%",
    alignSelf: "center",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(210,210,210)",
  },
  label: {
    marginLeft: 10,
  },
  contenedorTexto: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  botonFiltro: {
    backgroundColor: "orange",
    width: "33%",
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  input: { width: 100, height: 10 },
});

export default FiltroPrecio;
