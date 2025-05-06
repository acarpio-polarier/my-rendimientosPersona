import React, { useState, memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../../styles/base";
/**
 * TarjetaRendimiento - Componente simple que muestra un contenido principal y expandible
 *
 * Props:
 * @param {string} titulo - Título de la tarjeta
 * @param {React.ReactNode} children - Contenido principal de la tarjeta (gráfico)
 * @param {React.ReactNode} contenidoExpandible - Contenido que se muestra al expandir
 * @param {boolean} cargando - Indica si los datos están cargando
 * @param {string} error - Mensaje de error, si existe
 */
const TarjetaRendimiento = memo(
  ({
    titulo = "Rendimiento",
    children,
    contenidoExpandible = null,
    cargando = false,
    error = null,
  }) => {
    const [expandido, setExpandido] = useState(false);

    const toggleExpansion = () => {
      setExpandido(!expandido);
    };

    // Renderizar el contenido principal según el estado
    const renderContenidoPrincipal = () => {
      if (cargando) {
        return <ActivityIndicator size="large" color={colors.primary} />;
      }

      if (error) {
        return <Text style={styles.error}>{error}</Text>;
      }

      return children;
    };

    return (
      <View style={styles.contenedorGeneral}>
        {/* Título */}
        <View style={styles.headerTarjeta}>
          <Text style={styles.tituloTarjeta}>{titulo}</Text>
        </View>

        {/* Contenido Principal */}
        <View style={styles.contenidoPrincipal}>
          {renderContenidoPrincipal()}
        </View>

        {/* Botón de Expansión (siempre visible) */}
        <TouchableOpacity
          style={styles.barraExpansion}
          onPress={toggleExpansion}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name={expandido ? "chevron-up" : "chevron-down"}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>

        {/* Contenido Expandible */}
        {expandido && !cargando && !error && (
          <View style={styles.contenidoExpandible}>
            {contenidoExpandible || (
              <Text>No hay contenido adicional disponible</Text>
            )}
          </View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  contenedorGeneral: {
    flexDirection: "column",
    minHeight: 100,
    backgroundColor: "white",
    width: "95%",
    borderRadius: 10,
    shadowOpacity: 0.25,
    elevation: 5,
    marginVertical: 10,
    alignSelf: "center",
  },
  headerTarjeta: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tituloTarjeta: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  contenidoPrincipal: {
    padding: 15,
    minHeight: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  barraExpansion: {
    height: 24,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  contenidoExpandible: {
    backgroundColor: "#f9f9f9",
    maxHeight: 300,
    padding: 15,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});

export default TarjetaRendimiento;
