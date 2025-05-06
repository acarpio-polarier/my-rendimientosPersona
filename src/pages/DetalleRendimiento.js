import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../styles/base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/es";

export default function DetalleRendimiento({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { data } = route.params || { data: [] };

  // Configurar moment para usar español
  moment.locale("es");

  // Define los campos que quieres mostrar con sus títulos personalizados
  // y valores predeterminados para campos que podrían no existir
  const camposDeInteres = {
    // Campos existentes
    IntervaloTiempoHoras: {
      titulo: "Tiempo en máquina",
      placeholder: "0.00",
      unidad: "h",
      decimales: 2,
    },
    RendimientoGlobal: {
      titulo: "Rendimiento en la sesión",
      placeholder: "0.00",
      unidad: "%",
      decimales: 2,
    },
    MediaPrendasPorHora: {
      titulo: "Media de prendas por hora",
      placeholder: "0",
      unidad: "p/h",
      decimales: 0,
    },
    Tokens: {
      titulo: "Tokens ganados",
      placeholder: "0",
      unidad: "",
      decimales: 0,
    },
  };

  // Función para formatear fecha y hora
  const formatearFecha = (fechaString) => {
    if (!fechaString) return "Fecha desconocida";

    try {
      const fecha = moment(fechaString);
      if (!fecha.isValid()) return "Fecha inválida";

      // Formato: "Lunes, 25 de abril de 2023 - 14:30h"
      return fecha.format("dddd, D [de] MMMM [de] YYYY - HH:mm[h]");
    } catch (error) {
      console.error("Error al formatear fecha", error);
      return "Error al formatear fecha";
    }
  };

  // Función para obtener un título para cada elemento
  const obtenerTitulo = (item, index) => {
    if (!item) return `Registro ${index + 1}`;

    // Si tiene fechaIni, usamos esa
    if (item.fechaIni) {
      return formatearFecha(item.fechaIni);
    }

    // Si tiene fecha, usamos esa
    if (item.fecha) {
      return formatearFecha(item.fecha);
    }

    // Si no tiene fechas, usamos un título genérico con el índice
    return `Registro ${index + 1}`;
  };

  // Función para formatear valores numéricos
  const formatearValor = (valor, config) => {
    if (typeof valor !== "number") {
      return `${valor}${config.unidad}`;
    }

    // Para MediaPrendasPorHora y Tokens, formateamos sin decimales
    if (config.decimales === 0) {
      return `${valor.toLocaleString("es-ES", { maximumFractionDigits: 0 })}${
        config.unidad
      }`;
    }
    // Para otros números, usamos 2 decimales
    return `${valor.toLocaleString("es-ES", {
      minimumFractionDigits: config.decimales,
      maximumFractionDigits: config.decimales,
    })}${config.unidad}`;
  };

  // Función para renderizar cada item del array principal
  const renderizarItem = (item, index) => {
    if (!item) return null;

    const titulo = obtenerTitulo(item, index);

    return (
      <View key={index} style={styles.section}>
        <Text style={styles.sectionTitle}>{titulo}</Text>

        {/* Renderizamos todos los campos definidos en camposDeInteres */}
        {Object.entries(camposDeInteres).map(([key, config]) => {
          const tieneValor = item.hasOwnProperty(key);
          let valorMostrado;

          if (tieneValor) {
            valorMostrado = formatearValor(item[key], config);
          } else {
            // Si no tiene valor, usar el placeholder
            valorMostrado = config.placeholder + config.unidad;
          }

          // Determinar si es el campo de tokens (solo este será destacado)
          const esTokens = key === "Tokens";

          return (
            <View
              key={key}
              style={[styles.item, esTokens && styles.itemDestacado]}
            >
              <Text style={[styles.label, esTokens && styles.labelDestacado]}>
                {config.titulo}:
              </Text>
              <Text
                style={[
                  styles.value,
                  !tieneValor && styles.placeholderValue,
                  esTokens && styles.valueDestacado,
                ]}
              >
                {valorMostrado}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ paddingTop: insets.top }}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Detalle de Rendimiento</Text>
        </View>

        {Array.isArray(data) && data.length > 0 ? (
          <View style={styles.dataContainer}>
            {data.map((item, index) => renderizarItem(item, index))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No hay datos disponibles</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Text style={styles.backButton} onPress={() => navigation.goBack()}>
            Volver
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={22}
          color={colors.primary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    padding: 15,
    backgroundColor: colors.primary,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  dataContainer: {
    padding: 15,
  },
  section: {
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2c3e50",
    textTransform: "capitalize",
  },
  item: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
    alignItems: "center",
  },
  // Estilo para tokens destacados
  itemDestacado: {
    backgroundColor: "#f9f9f9",
    borderRadius: 6,
    marginVertical: 2,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  label: {
    flex: 1,
    fontWeight: "500",
    color: "#34495e",
    fontSize: 14,
  },
  labelDestacado: {
    fontWeight: "600",
    color: "#2c3e50",
  },
  value: {
    flex: 1,
    color: "#7f8c8d",
    textAlign: "right",
    fontSize: 14,
  },
  valueDestacado: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 16,
  },
  placeholderValue: {
    color: "#aaa",
    fontStyle: "italic",
  },
  emptyState: {
    padding: 30,
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#95a5a6",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  backButton: {
    fontSize: 16,
    color: "white",
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    overflow: "hidden",
  },
  // Estilos para el FAB
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: colors.white,
    borderRadius: 28,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
