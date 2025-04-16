import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, fontFamily } from "../../../../styles/base";

const FiltroCategoria = ({ onChange, categoria }) => {
  const [seleccionado, setSeleccionado] = useState(categoria);

  const opciones = [
    { id: 1, label: "Experiencias" },
    { id: 2, label: "Servicios" },
    { id: 3, label: "Otros" },
  ];

  const handleSeleccion = (id) => {
    setSeleccionado(id);
    onChange && onChange(id);
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.label}>
        <Text style={{ fontWeight: "bold" }}>Filtrar por:</Text>
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
});

export default FiltroCategoria;
