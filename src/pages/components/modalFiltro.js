import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Switch } from "react-native-paper";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import ModalRendimiento from "./../../components/ModalRendimiento";
import { colors } from "../../../styles/base";
import token from "../fotos/token.png";

const ModalFiltro = ({ visible, cerrarPopup, onAplicarFiltros }) => {
  const [orden, setOrden] = useState(0);
  const [categoria, setCategoria] = useState(0);
  const [precioRango, setPrecioRango] = useState([10, 500]);
  const [modalVisible, setModalVisible] = useState(visible);
  const [canjeable, setCanjeable] = useState(false);

  const opcionesOrden = [
    { id: 1, label: "Novedades" },
    { id: 2, label: "Precio As." },
    { id: 3, label: "Precio Des." },
  ];

  const handleSeleccionOrden = (id) => {
    setOrden(id);
  };

  const opcionesCategoria = [
    { id: 1, label: "Experiencias" },
    { id: 2, label: "Servicios" },
    { id: 3, label: "Otros" },
  ];

  const handleSeleccionCategoria = (id) => {
    setCategoria(id);
  };

  const onSwitchPulsado = () => {
    setCanjeable(!canjeable);
  };

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
      {/* FILTRO ORDEN */}
      <View style={styles.contenedorFiltro}>
        <View style={styles.label}>
          <Text style={{ fontWeight: "bold" }}>Ordenar por:</Text>
        </View>

        <View style={styles.contenedorBotones}>
          {opcionesOrden.map((opcion) => (
            <TouchableOpacity
              key={opcion.id}
              style={[
                styles.botonFiltro,
                orden === opcion.id && styles.botonActivo,
              ]}
              onPress={() => handleSeleccionOrden(opcion.id)}
            >
              <Text style={styles.labelBoton}>{opcion.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* FILTRO CATEGORIA */}
      <View style={styles.contenedorFiltro}>
        <View style={styles.label}>
          <Text style={{ fontWeight: "bold" }}>Filtrar por:</Text>
        </View>

        <View style={styles.contenedorBotones}>
          {opcionesCategoria.map((opcion) => (
            <TouchableOpacity
              key={opcion.id}
              style={[
                styles.botonFiltro,
                categoria === opcion.id && styles.botonActivo,
              ]}
              onPress={() => handleSeleccionCategoria(opcion.id)}
            >
              <Text style={styles.labelBoton}>{opcion.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* FILTRO PRECIO */}
      <View style={styles.contenedorFiltroPrecio}>
        <View style={styles.label}>
          <Text style={styles.labelText}>Precio:</Text>
        </View>

        <View style={styles.contenedorTexto}>
          <View style={styles.contenedorPrecio}>
            <Text>Precio más bajo</Text>
            <View style={styles.contenedorTextoIcono}>
              <Image style={styles.tokenIcono} source={token} />
              <Text style={styles.valor}>{precioRango[0]}</Text>
            </View>
          </View>

          <View style={styles.contenedorPrecio}>
            <Text>Precio más alto</Text>
            <View style={styles.contenedorTextoIcono}>
              <Image style={styles.tokenIcono} source={token} />
              <Text style={styles.valor}>{precioRango[1]}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sliderContainer}>
          <MultiSlider
            values={precioRango}
            onValuesChange={setPrecioRango}
            min={0}
            max={1000}
            step={10}
            allowOverlap={false}
            snapped
            selectedStyle={{ backgroundColor: colors.primary }}
            markerStyle={{ backgroundColor: colors.primary }}
          />
        </View>
      </View>

      {/* FILTRO SWITCH */}
      <View style={styles.contenedorCanjeableFiltro}>
        <View style={styles.contenedorItems}>
          <Text style={styles.label}>Canjeable: </Text>
          <Switch
            style={styles.switch}
            value={canjeable}
            onValueChange={onSwitchPulsado}
          />
        </View>
      </View>

      {/* CONTENEDOR PRINCIPAL */}
      <View style={styles.fondo}>
        <View style={styles.contenedor}>
          <View style={styles.linea} />

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
  // FiltroOrdenar y FiltroCategoria
  contenedorFiltro: {
    width: "100%",
    alignSelf: "center",
    marginVertical: 10,
  },
  label: {
    marginLeft: 10,
    marginBottom: 5,
  },
  contenedorBotones: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  botonFiltro: {
    backgroundColor: colors.primary_light,
    width: "33%",
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.6,
  },
  botonActivo: {
    backgroundColor: colors.primary,
    opacity: 1,
  },
  labelBoton: {
    color: "white",
  },
  // FiltroPrecio
  contenedorFiltroPrecio: {
    width: "100%",
    alignSelf: "center",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(210,210,210)",
    paddingHorizontal: 10,
  },
  labelText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  contenedorTexto: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  contenedorPrecio: {
    alignItems: "center",
  },
  contenedorTextoIcono: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "end",
    marginTop: 5,
  },
  valor: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sliderContainer: {
    alignSelf: "center",
    marginBottom: 5,
  },
  tokenIcono: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  // Switch canjeable
  contenedorCanjeableFiltro: {
    width: "100%",
    alignSelf: "center",
    marginVertical: 10,
  },
  contenedorItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  switch: {
    height: 20,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
});

export default ModalFiltro;
