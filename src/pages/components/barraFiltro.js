import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ContenedorFiltro from "./contenedorFiltro";
import Productos from "./productos";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BarraFiltro = ({ data, dataTokens }) => {
  const [visible, setVisible] = useState(false);
  const [filtros, setFiltros] = useState({
    categoria: 0,
    orden: null,
    precioRango: [0, 1000],
    canjebale: false,
  });

  const aplicarFiltros = (valores) => {
    console.log("Filtros recibidos a barraFiltro:", valores);
    setFiltros(valores);
  };

  const filtrarDatos = () => {
    let filtrado = data;

    const categoria = parseInt(filtros.categoria);
    const [minPrecio, maxPrecio] = filtros.precioRango;

    if (!isNaN(categoria) && categoria !== 0) {
      filtrado = filtrado.filter((item) => item.categoria === categoria);
    }

    if (!isNaN(minPrecio) && !isNaN(maxPrecio)) {
      filtrado = filtrado.filter((item) => {
        return item.price >= minPrecio && item.price <= maxPrecio;
      });
    }

    if (filtros.canjebale && dataTokens?.tokens != null) {
      filtrado = filtrado.filter((item) => item.price <= dataTokens.tokens);
    }

    console.log("Datos filtrados:", filtrado);
    return filtrado;
  };

  const productosFiltrados = filtrarDatos();

  const abrirPopup = () => {
    setVisible(true);
  };

  const cerrarPopup = () => {
    setVisible(false);
  };

  const reiniciarFiltros = () => {
    setFiltros({ categoria: 0, orden: null, precioRango: [0, 1000] });
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.contenedorBotones}>
        <TouchableOpacity style={styles.boton} onPress={abrirPopup}>
          <Text style={styles.labelBoton}>Filtros</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonFilter} onPress={reiniciarFiltros}>
          <MaterialCommunityIcons name="filter-off" size={20} color={"white"} />
        </TouchableOpacity>
      </View>
      <View style={styles.linea}></View>
      <ContenedorFiltro
        visible={visible}
        cerrarPopup={cerrarPopup}
        onAplicarFiltros={aplicarFiltros}
      />
      <Productos data={productosFiltrados} />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    width: "100%",
    alignSelf: "center",
    marginTop: -5,
  },

  contenedorBotones: {
    flexDirection: "row",
  },

  linea: {
    borderBottomWidth: 1,
    borderBottomColor: "rgb(210,210,210)",
  },

  boton: {
    backgroundColor: "orange",
    width: "20%",
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 20,
  },

  botonFilter: {
    backgroundColor: "orange",
    width: "10%",
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 5,
  },

  labelBoton: {
    color: "white",
  },
});

export default BarraFiltro;
