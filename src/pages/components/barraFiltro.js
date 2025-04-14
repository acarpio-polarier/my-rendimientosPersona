import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-web";

const BarraFiltro = () => {
  const [valorSlider, setValorSlider] = useState(50);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("Opción 1");
  const [selected, setSelected] = useState(false);

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
        {/* <View style={[styles.elemento, styles.sliderContainer]}>
          <Text style={styles.labelSlider}>Precio</Text>
          <input
            type="range"
            min="0"
            max="100"
            value={valorSlider}
            onChange={(e) => setValorSlider(e.target.value)}
            style={styles.slider}
          />
        </View> */}
        <View style={styles.elemento}>
          <Text style={styles.labelCategoria}>Categorias</Text>
          <select
            value={opcionSeleccionada}
            onChange={(e) => setOpcionSeleccionada(e.target.value)}
            style={styles.selectBox}
          >
            <option value="1">Todo</option>
            <option value="2">Servicios</option>
            <option value="3">Experiencias</option>
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
    borderBottomWidth: 1,
    borderBottomColor: "rgb(210,210,210)",
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
});

export default BarraFiltro;
