import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../styles/base";

const BarraExpandible = ({
  children,
  hayDatos = false,
  expandidoInicial = false,
}) => {
  const [expandido, setExpandido] = useState(expandidoInicial);

  const toggleExpansion = () => {
    setExpandido(!expandido);
  };
  useEffect(() => {
    setExpandido(false);
  }, [children]);

  return (
    <View style={styles.container}>
      {/* Cuando no está expandido, mostramos solo la barra superior */}
      {!expandido && (
        <TouchableOpacity
          style={[styles.barraExpansion, styles.barraExpansionRedondeada]}
          onPress={toggleExpansion}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="chevron-down" size={24} color="#fff" />
        </TouchableOpacity>
      )}

      {/* Cuando está expandido, mostramos el contenido y luego la barra abajo */}
      {expandido && (
        <>
          <View style={styles.contenidoExpandible}>
            {hayDatos ? children : <Text style={styles.mensajeSinDatos}></Text>}
          </View>

          <TouchableOpacity
            style={[styles.barraExpansion, styles.barraExpansionRedondeada]}
            onPress={toggleExpansion}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="chevron-up" size={24} color="#fff" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
    backgroundColor: "white",
    maxHeight: 250,
    padding: 0,
  },
  mensajeSinDatos: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
    maxHeight: 0,
  },
});

export default BarraExpandible;
