import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../styles/base";

const DetalleRendimientoDesplegable = ({ datos, cargando }) => {
  // Usar useMemo para memorizar los datos y evitar recálculos innecesarios
  const rendimientoMemoizado = useMemo(() => {
    // Si hay datos, usa el último conjunto
    if (datos && datos.length > 0) {
      const acumulados = datos[datos.length - 1];
      return {
        HorasTrabajoAcumuladas: acumulados.HorasTrabajadasAcumuladas ?? 0,
        totalPrendas: acumulados.TotalPrendasAcumuladas ?? 0,
        mediaPrendasPorHora: acumulados.MediaPrendasPorHoraAcumulada ?? 0,
      };
    }

    // Si no hay datos, retorna valores por defecto
    return {
      HorasTrabajoAcumuladas: 0,
      totalPrendas: 0,
      mediaPrendasPorHora: 0,
    };
  }, [datos]);

  return (
    <View style={[styles.contenidoVisualizacion, cargando && styles.cargando]}>
      <View style={styles.seccionMetrica}>
        <Text style={styles.tituloMetrica}>Horas Trabajadas</Text>
        <Text style={styles.valorMetrica}>
          {rendimientoMemoizado.HorasTrabajoAcumuladas.toFixed(1)} hrs
        </Text>
      </View>

      <View style={styles.divisor} />

      <View style={styles.seccionMetrica}>
        <Text style={styles.tituloMetrica}>Total Prendas</Text>
        <Text style={styles.valorMetrica}>
          {rendimientoMemoizado.totalPrendas}
        </Text>
      </View>

      <View style={styles.divisor} />

      <View style={styles.seccionMetrica}>
        <Text style={styles.tituloMetrica}>Media Prendas/Hora</Text>
        <Text style={styles.valorMetrica}>
          {rendimientoMemoizado.mediaPrendasPorHora.toFixed(1)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenidoVisualizacion: {
    padding: 15,
    opacity: 1,
    transition: "opacity 0.3s ease-in-out",
    width: "100%",
  },
  cargando: {
    opacity: 0.5,
  },
  seccionMetrica: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  divisor: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 5,
  },
  tituloMetrica: {
    fontSize: 20,
    color: "#333",
    fontWeight: "500",
  },
  valorMetrica: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
  },
});

export default DetalleRendimientoDesplegable;
