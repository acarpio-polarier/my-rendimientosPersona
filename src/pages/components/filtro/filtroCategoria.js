import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const FiltroCategoria = () => {
  return (
    <View style={styles.contenedor}>
      <View style={styles.label}>
        <Text>Categoría: </Text>
      </View>
      <View style={styles.contenedorBotones}>
        <TouchableOpacity style={styles.botonFiltro}>
          <Text style={styles.labelBoton}>Experiencias</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonFiltro}>
          <Text style={styles.labelBoton}>Servicios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonFiltro}>
          <Text style={styles.labelBoton}>Otros</Text>
        </TouchableOpacity>
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
  contenedorBotones: {
    flexDirection: "row",
    justifyContent: "space-around",
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
  labelBoton: {
    color: "white",
  },
});

export default FiltroCategoria;
