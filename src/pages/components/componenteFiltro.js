import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ModalFiltro from "./modalFiltro";
import ProductosCards from "./productosCards";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ComponenteFiltro = ({ data, dataTokens }) => {
  const [visible, setVisible] = useState(false);
  const [filtros, setFiltros] = useState({
    categoria: null,
    orden: null,
    precioRango: [0, 1000],
    canjeable: false,
  });

  const aplicarFiltros = (valores) => {
    console.log("Filtros recibidos a ComponenteFiltro:", valores);
    setFiltros(valores);
  };

  const filtrarDatos = () => {
    let filtrado = data;

    const categoria = parseInt(filtros.categoria);
    const [minPrecio, maxPrecio] = filtros.precioRango;
    const canjeable = filtros.canjeable;

    if (filtros.orden === 2) {
      filtrado = [...filtrado].sort((a, b) => a.price - b.price);
    } else if (filtros.orden === 3) {
      filtrado = [...filtrado].sort((a, b) => b.price - a.price);
    }

    if (!isNaN(categoria) && categoria !== 0) {
      filtrado = filtrado.filter((item) => item.categoria === categoria);
    }

    if (!isNaN(minPrecio) && !isNaN(maxPrecio)) {
      filtrado = filtrado.filter((item) => {
        return item.price >= minPrecio && item.price <= maxPrecio;
      });
    }

    if (canjeable) {
      const tokensDisponibles = dataTokens[0].tokens;
      filtrado = filtrado.filter((item) => item.price <= tokensDisponibles);
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
    setFiltros({
      categoria: 0,
      orden: null,
      precioRango: [0, 1000],
      canjeable: false,
    });
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
      <ModalFiltro
        visible={visible}
        cerrarPopup={cerrarPopup}
        onAplicarFiltros={aplicarFiltros}
      />
      <ProductosCards data={productosFiltrados} />
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
    backgroundColor: "#EDB637",
    width: "20%",
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 20,
  },

  botonFilter: {
    backgroundColor: "#EDB637",
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

export default ComponenteFiltro;
