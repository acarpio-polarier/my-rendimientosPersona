import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../styles/base";

const BarraExpandible = ({
  children,
  hayDatos = true,
  mensajeSinDatos = "No hay datos disponibles para esta semana.",
  expandidoInicial = false,
}) => {
  const [expandido, setExpandido] = useState(expandidoInicial);

  const toggleExpansion = () => {
    setExpandido(!expandido);
  };

  return (
    <View style={styles.container}>
      {/* Botón de Expansión */}
      <TouchableOpacity
        style={[
          styles.barraExpansion,
          // Si no está expandido, aplicamos bordes redondeados inferiores
          !expandido && styles.barraExpansionRedondeada,
        ]}
        onPress={toggleExpansion}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons
          name={expandido ? "chevron-up" : "chevron-down"}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>

      {/* Contenido Expandible*/}
      {expandido && (
        <View style={styles.contenidoExpandible}>
          {hayDatos ? (
            children
          ) : (
            <Text style={styles.mensajeSinDatos}>{mensajeSinDatos}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: "hidden",
  },
  barraExpansion: {
    height: 19,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  barraExpansionRedondeada: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  contenidoExpandible: {
    backgroundColor: "#f9f9f9",
    maxHeight: 300,
    padding: 15,
  },
  mensajeSinDatos: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
  },
});

export default BarraExpandible;
