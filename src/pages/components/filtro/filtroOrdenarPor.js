import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, fontFamily } from "../../../../styles/base";

const FiltroOrdenarPor = ({ onChange }) => {
  const [seleccionado, setSeleccionado] = useState(null);

  const opciones = [
    { id: 1, label: "Novedades" },
    { id: 2, label: "Precio As." },
    { id: 3, label: "Precio Des." },
  ];

  const handleSeleccion = (id) => {
    setSeleccionado(id);
    onChange && onChange(id);
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.label}>
        <Text>Ordenar por:</Text>
      </View>
      <View style={styles.contenedorBotones}>
        {opciones.map((opcion) => (
          <TouchableOpacity
            key={opcion.id}
            style={[
              styles.botonFiltro,
              seleccionado === opcion.id && styles.botonActivo,
            ]}
            onPress={() => handleSeleccion(opcion.id)}
          >
            <Text style={styles.labelBoton}>{opcion.label}</Text>
          </TouchableOpacity>
        ))}
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
  },
  label: {
    marginLeft: 10,
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
});

export default FiltroOrdenarPor;
