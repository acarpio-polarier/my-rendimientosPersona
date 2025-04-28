import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../styles/base";
import { PERSONA_ID } from "../Index";
import RendimientoUtils from "../../helpers/RendimientoUtils";

const DetalleRendimientoDesplegable = ({ datos, cargando }) => {
  const [horasTrabajadas, setHorasTrabajadas] = useState("00:00:00");
  const [totalPrendas, setTotalPrendas] = useState(0);
  const [mediaPrendasHora, setMediaPrendasHora] = useState(0);
  const [horaCargada, setHoraCargada] = useState(false);

  useEffect(() => {
    console.log("detalles datos", datos);
    cargarDatos(PERSONA_ID, datos.inicioIso, datos.finIso);
  }, [horaCargada]);

  const mostrarHoras = () => {
    const horas = horasTrabajadas.split(":")[0];
    const minutos = horasTrabajadas.split(":")[1];
    const segundos = horasTrabajadas.split(":")[2];
    const horasTexto = `${horas}h ${minutos}m`;
    console.log(
      "texto horas Treabajadas",
      horas,
      "h",
      minutos,
      "m",
      segundos,
      "s"
    );
    return horasTexto;
  };
  const cargarDatos = async (idPersona, fechaIni, fechaFin) => {
    const fechaInicio = new Date(fechaIni).toISOString().split("T")[0];
    const fechaFinal = new Date(fechaFin).toISOString().split("T")[0];

    const datos = await RendimientoUtils.getDetallesPersona(
      idPersona,
      fechaInicio,
      fechaFinal
    );

    console.log("DRD getDetallesPersona", datos);
    setHorasTrabajadas(datos.TiempoTrabajado);
    setTotalPrendas(datos.TotalPrendas);
    setMediaPrendasHora(datos.MediaPrendasHora);
    setHoraCargada(true);
  };

  if (!horaCargada) {
    return null;
  }
  return (
    <View style={[styles.contenidoVisualizacion, cargando && styles.cargando]}>
      <View style={styles.seccionMetrica}>
        <Text style={styles.tituloMetrica}>Horas Trabajadas</Text>
        <Text style={styles.valorMetrica}>{mostrarHoras()}</Text>
      </View>

      <View style={styles.divisor} />

      <View style={styles.seccionMetrica}>
        <Text style={styles.tituloMetrica}>Total Prendas</Text>
        <Text style={styles.valorMetrica}>{totalPrendas}</Text>
      </View>

      <View style={styles.divisor} />

      <View style={styles.seccionMetrica}>
        <Text style={styles.tituloMetrica}>Media Prendas/Hora</Text>
        <Text style={styles.valorMetrica}>{mediaPrendasHora}</Text>
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
