import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FiltroOrdenarPor from "./filtro/filtroOrdenarPor";
import FiltroCategoria from "./filtro/filtroCategoria";
import FiltroPrecio from "./filtro/filtroPrecio";
import FiltroBotonCanjeable from "./filtro/filtroBotonCanjeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ContenedorFiltro = () => {
  return (
    <View style={styles.contenedor}>
      <View style={styles.barraSuperior}>
        <TouchableOpacity style={styles.botonAtras}>
          <MaterialCommunityIcons name="close" size={20} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonReiniciar}>
          <Text style={styles.iconoBoton}>Reiniciar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.linea} />
      <View>
        <FiltroOrdenarPor />
        <FiltroCategoria />
        <FiltroPrecio />
        <FiltroBotonCanjeable />
      </View>
      <View style={styles.barraInferior}>
        <TouchableOpacity style={styles.botonAplicar}>
          <Text style={styles.iconoBoton}>Aplicar Filtros</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
    marginVertical: 10,
  },
  barraSuperior: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  barraInferior: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  botonAtras: {
    backgroundColor: "orange",
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  botonReiniciar: {
    backgroundColor: "brown",
    width: 70,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  botonAplicar: {
    backgroundColor: "orange",
    width: 200,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  iconoBoton: {
    color: "white",
    fontWeight: "bold",
  },
  linea: {
    borderBottomWidth: 1,
    borderBottomColor: "rgb(210,210,210)",
  },
});

export default ContenedorFiltro;
