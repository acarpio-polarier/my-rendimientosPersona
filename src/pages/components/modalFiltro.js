import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FiltroOrdenarPor from "./filtro/filtroOrdenarPor";
import FiltroCategoria from "./filtro/filtroCategoria";
import FiltroPrecio from "./filtro/filtroPrecio";
import FiltroBotonCanjeable from "./filtro/filtroBotonCanjeable";
import ModalRendimiento from "./../../components/ModalRendimiento";
import { colors } from "../../../styles/base";

const ModalFiltro = ({ visible, cerrarPopup, onAplicarFiltros }) => {
  const [orden, setOrden] = useState(0);
  const [categoria, setCategoria] = useState(0);
  const [precioRango, setPrecioRango] = useState([10, 500]);
  const [modalVisible, setModalVisible] = useState(visible);
  const [canjeable, setCanjeable] = useState(false);

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
    const filtros = { orden, categoria, precioRango, canjeable };
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
            <FiltroBotonCanjeable
              canjeable={canjeable}
              onChange={(valor) => setCanjeable(valor)}
            />
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
    backgroundColor: colors.primary,
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
    backgroundColor: colors.primary,
    width: 200,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  iconoBoton: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 20,
  },
  linea: {
    borderBottomWidth: 1,
    borderBottomColor: "rgb(210,210,210)",
  },
});

export default ModalFiltro;
