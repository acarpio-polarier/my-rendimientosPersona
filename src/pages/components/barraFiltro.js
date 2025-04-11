import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { CheckBox } from "react-native-web";

const BarraFiltro = () => {
  const [valorSlider, setValorSlider] = useState(50);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("Opción 1");

  return (
    <View style={styles.contenedor}>
      <View style={styles.fila}>
        <View style={styles.checkBox}>
          <CheckBox />
        </View>
        <View style={styles.imput}>
          <input
            type="range"
            min="0"
            max="100"
            value={valorSlider}
            onChange={(e) => setValorSlider(e.target.value)}
            style={styles.slider}
          />
        </View>
        <View style={styles.selectBox}>
          <select
            value={opcionSeleccionada}
            onChange={(e) => setOpcionSeleccionada(e.target.value)}
            style={styles.selectBox}
          >
            <option value="Opción 1">Opción 1</option>
            <option value="Opción 2">Opción 2</option>
            <option value="Opción 3">Opción 3</option>
          </select>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    width: "100%",
    alignSelf: "center",
    overflow: "hidden",
    marginVertical: 10,
    fontFamily: "Arial",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  labelFiltro: {
    marginBottom: 10,
    marginLeft: 10,
  },
  fila: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  checkBox: {},
  slider: {
    width: 150,
    marginRight: 10,
    marginLeft: 40,
  },
  selectBox: {
    padding: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "orange",
    marginRight: 10,
    width: 140,
  },
  imput: {
    backgroundColor: "red",
  },
});

export default BarraFiltro;
