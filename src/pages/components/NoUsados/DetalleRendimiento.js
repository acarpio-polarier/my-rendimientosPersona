import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../styles/base";
import { ScrollView } from "react-native-web";

const DetalleRendimiento = ({ datos }) => {
  const acumulados = datos[datos.length - 1];
  const HorasTrabajoAcumuladas = acumulados.HorasTrabajadasAcumuladas;
  const totalPrendas = acumulados.TotalPrendasAcumuladas;
  const mediaPrendasPorHora = acumulados.MediaPrendasPorHoraAcumulada;

  console.log(acumulados.HorasTrabajadasAcumuladas);

  return (
    <ScrollView>
      <View style={styles.contenidoVisualizacion}>
        <View style={styles.seccionMetrica}>
          <Text style={styles.tituloMetrica}>Horas Trabajadas</Text>
          <Text style={styles.valorMetrica}>
            {HorasTrabajoAcumuladas || 0} hrs
          </Text>
        </View>

        <View style={styles.divisor} />

        <View style={styles.seccionMetrica}>
          <Text style={styles.tituloMetrica}>Total Prendas</Text>
          <Text style={styles.valorMetrica}>{totalPrendas || 0}</Text>
        </View>

        <View style={styles.divisor} />

        <View style={styles.seccionMetrica}>
          <Text style={styles.tituloMetrica}>Media Prendas/Hora</Text>
          <Text style={styles.valorMetrica}>{mediaPrendasPorHora || 0}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contenidoVisualizacion: {
    backgroundColor: "white",
    padding: 15,
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
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  valorMetrica: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
});

export default DetalleRendimiento;
