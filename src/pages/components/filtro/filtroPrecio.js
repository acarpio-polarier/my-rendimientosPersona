import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import token from "../../fotos/token.png";
import { colors } from "../../../../styles/base";

const FiltroPrecio = ({ precioRango, setPrecioRango }) => {
  return (
    <View style={styles.contenedor}>
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
  );
};

const styles = StyleSheet.create({
  contenedor: {
    width: "100%",
    alignSelf: "center",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(210,210,210)",
    paddingHorizontal: 10,
  },
  label: {
    marginBottom: 10,
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
});

export default FiltroPrecio;
