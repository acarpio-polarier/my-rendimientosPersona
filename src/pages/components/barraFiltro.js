import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ContenedorFiltro from "./contenedorFiltro";
import Productos from "./productos";

const BarraFiltro = ({ data, dataTokens }) => {
  const [visible, setVisible] = useState(false);
  const [filtros, setFiltros] = useState({
    categoria: 0,
    orden: null,
    precioRango: [0, 1000],
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

  return (
    <View style={styles.contenedor}>
      <TouchableOpacity style={styles.boton} onPress={abrirPopup}>
        <Text style={styles.labelCanjeable}>Filtros</Text>
      </TouchableOpacity>
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

  labelCanjeable: {
    fontSize: 15,
    color: "white",
  },

  linea: {
    borderBottomWidth: 1,
    borderBottomColor: "rgb(210,210,210)",
  },

  boton: {
    backgroundColor: "orange",
    width: "33%",
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 20,
  },
});

export default BarraFiltro;
