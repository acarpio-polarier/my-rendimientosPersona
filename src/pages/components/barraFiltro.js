import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-web";
import Productos from "./productos";

const BarraFiltro = ({ data }) => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("0");
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    console.log("Datos desde Barra:", data);
  }, [data]);

  const filtrarDatos = () => {
    let filtrado = data;

    if (opcionSeleccionada !== "0") {
      const categoria = parseInt(opcionSeleccionada);
      filtrado = filtrado.filter((item) => item.categoria === categoria);
    }

    console.log("Datos filtrados:", filtrado);
    return filtrado;
  };

  const productosFiltrados = filtrarDatos();

  return (
    <View style={styles.contenedor}>
      <View style={styles.fila}>
        <View style={styles.elemento}>
          <Text style={styles.labelCanjeable}>Canjeable</Text>
          <CheckBox
            value={selected}
            onValueChange={setSelected}
            style={styles.checkBox}
          />
        </View>
        <View style={styles.elemento}>
          <Text style={styles.labelCategoria}>Categorias</Text>
          <select
            value={opcionSeleccionada}
            onChange={(e) => setOpcionSeleccionada(e.target.value)}
            style={styles.selectBox}
          >
            <option value="0">Todo</option>
            <option value="1">Experiencias</option>
            <option value="2">Servicios</option>
          </select>
        </View>
      </View>
      <View style={styles.linea}></View>
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
  fila: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  elemento: {
    alignItems: "center",
    justifyContent: "flex-end",
  },

  labelCanjeable: {
    marginBottom: 8,
    fontSize: 12,
    color: "rgb(160,160,160)",
    justifyContent: "end",
  },

  labelSlider: {
    marginBottom: 8,
    fontSize: 12,
    color: "rgb(160,160,160)",
    alignSelf: "flex-end",
  },

  labelCategoria: {
    fontSize: 12,
    color: "rgb(160,160,160)",
    marginBottom: 5,
    alignSelf: "flex-end",
  },

  sliderContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 5,
  },

  slider: {
    width: "100%",
  },

  selectBox: {
    padding: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    width: 140,
  },
  checkBox: { marginBottom: 8, alignSelf: "flex-start" },
  linea: { borderBottomWidth: 1, borderBottomColor: "rgb(210,210,210)" },
});

export default BarraFiltro;
