import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FiltroOrdenarPor from "./filtro/filtroOrdenarPor";
import FiltroCategoria from "./filtro/filtroCategoria";
import FiltroPrecio from "./filtro/filtroPrecio";
import FiltroBotonCanjeable from "./filtro/filtroBotonCanjeable";
import ModalRendimiento from "./../../components/ModalRendimiento";

const ContenedorFiltro = ({ visible, cerrarPopup, onAplicarFiltros }) => {
  const [orden, setOrden] = useState(0);
  const [categoria, setCategoria] = useState(0);
  const [precioRango, setPrecioRango] = useState([100, 500]);

  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
    }
  }, [visible]);

  const handleClose = () => {
    setModalVisible(false);
    setTimeout(() => {
      cerrarPopup();
    }, 300);
  };

  const confirmarFiltro = () => {
    const filtros = { orden, categoria, precioRango };
    console.log("Filtro aplicado en popup:", filtros);
    onAplicarFiltros(filtros);
    handleClose();
  };

  return (
    <ModalRendimiento
      isVisible={modalVisible}
      onClose={handleClose}
      title={"Filtros"}
      blurIntensity="light"
    >
      <View style={styles.fondo}>
        <View style={styles.contenedor}>
          <View style={styles.linea} />
          <View>
            <FiltroOrdenarPor onChange={(valor) => setOrden(valor)} />
            <FiltroCategoria onChange={(valor) => setCategoria(valor)} />
            <FiltroPrecio
              precioRango={precioRango}
              setPrecioRango={setPrecioRango}
            />
            <FiltroBotonCanjeable />
          </View>
          <View style={styles.barraInferior}>
            <TouchableOpacity
              style={styles.botonAplicar}
              onPress={confirmarFiltro}
            >
              <Text style={styles.iconoBoton}>Aplicar Filtros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ModalRendimiento>
  );
};

const styles = StyleSheet.create({
  // fondo: {
  //   flex: 1,
  //   backgroundColor: "rgba(0,0,0,0.5)",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // contenedor: {
  //   backgroundColor: "white",
  //   borderRadius: 10,
  //   width: "95%",
  //   alignSelf: "center",
  //   shadowColor: "#000",
  //   shadowOffset: { width: 3, height: 3 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   overflow: "hidden",
  //   marginVertical: 10,
  // },
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
