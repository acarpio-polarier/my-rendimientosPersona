import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { rendimientoPersonasService } from "../../services/RendimientoPersonaService";
import { GraficoDonut } from "./GraficoDonut";
import { colors } from "../../../styles/base";
import RangoFechas from "./RangoFechas";
import SelectorHistorico from "./SelectorHistorico";
import DetalleRendimiento from "./DetalleRendimiento";

const TarjetaRendimiento = ({
  titulo = "Rendimiento",
  mostrarSelectoresFecha = true,
  mostrarSelectorHistorico = true,
}) => {
  const [datosRendimiento, setDatosRendimiento] = useState([]);
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState("DIA");
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [modalCalendario, setModalCalendario] = useState(false);
  const [expandido, setExpandido] = useState(false);

  useEffect(() => {
    const cargarDatosIniciales = async () => {
      const hoy = new Date();
      const inicioDelDia = new Date(hoy);
      inicioDelDia.setHours(0, 0, 0, 0);

      const finDelDia = new Date(hoy);
      finDelDia.setHours(23, 59, 59, 999);

      const fechaInicioStr = inicioDelDia.toISOString().split("T")[0];
      const fechaFinStr = finDelDia.toISOString().split("T")[0];

      setFechaInicio(fechaInicioStr);
      setFechaFin(fechaFinStr);

      try {
        const resultado =
          await rendimientoPersonasService.getRendimientoPersonaMaquina(
            fechaInicioStr,
            fechaFinStr
          );
        setDatosRendimiento(resultado);
      } catch (error) {
        console.error("Error al cargar datos iniciales", error);
      }
    };

    cargarDatosIniciales();
  }, []);

  const cargarDatosRendimiento = async (inicio, fin) => {
    try {
      const resultado =
        await rendimientoPersonasService.getRendimientoPersonaMaquina(
          inicio,
          fin
        );

      console.log(resultado);
      setDatosRendimiento(resultado);
      setFechaInicio(inicio);
      setFechaFin(fin);
    } catch (error) {
      console.error("Error al cargar datos", error);
    }
  };

  const onRangoDeFechasSeleccionado = (start, end) => {
    setFechaInicio(start);
    setFechaFin(end);
    setModalCalendario(false);
    cargarDatosRendimiento(start, end);
  };

  const onCambiarPeriodo = (start, end, periodo) => {
    setFechaInicio(start);
    setFechaFin(end);
    setPeriodoSeleccionado(periodo);
    cargarDatosRendimiento(start, end);
  };

  const toggleExpansion = () => setExpandido(!expandido);

  const renderContenidoExpandible = () => {
    if (!datosRendimiento || datosRendimiento.length === 0) {
      return (
        <View style={styles.contenidoExpandible}>
          <Text>No hay datos de rendimiento disponibles</Text>
        </View>
      );
    }

    return <DetalleRendimiento datos={datosRendimiento} />;
  };

  return (
    <View style={styles.contenedorGeneral}>
      {/* Título */}
      <View style={styles.headerTarjeta}>
        <Text style={styles.tituloTarjeta}>{titulo}</Text>
      </View>

      {/* Selector de fechas */}
      {mostrarSelectoresFecha && (
        <View style={styles.contenedorFechas}>
          <TouchableOpacity
            style={styles.fechaButton}
            onPress={() => setModalCalendario(true)}
          >
            <Text style={styles.fechaText}>
              {fechaInicio && fechaFin
                ? `${fechaInicio} - ${fechaFin}`
                : "Seleccionar Rango"}
            </Text>
            <MaterialCommunityIcons name="calendar" size={20} color="#333" />
          </TouchableOpacity>
        </View>
      )}

      {/* Modal con selector de rango de fechas */}
      <RangoFechas
        visible={modalCalendario}
        onClose={() => setModalCalendario(false)}
        onSelect={onRangoDeFechasSeleccionado}
      />

      {/* Selector Histórico */}
      {mostrarSelectorHistorico && (
        <SelectorHistorico onPeriodoCambiado={onCambiarPeriodo} />
      )}

      {/* Gráfico */}
      <View style={styles.contenidoPrincipal}>
        <GraficoDonut
          periodoSeleccionado={periodoSeleccionado}
          datos={datosRendimiento}
        />
      </View>

      {/* Expansión */}
      {!expandido && (
        <TouchableOpacity
          style={styles.barraExpansion}
          onPress={toggleExpansion}
        >
          <MaterialCommunityIcons name="chevron-down" size={24} color="#fff" />
        </TouchableOpacity>
      )}

      {expandido && (
        <>
          {renderContenidoExpandible()}
          <TouchableOpacity
            style={styles.barraExpansion}
            onPress={toggleExpansion}
          >
            <MaterialCommunityIcons name="chevron-up" size={24} color="#fff" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

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
  contenedorFechas: {
    flexDirection: "row",
    marginTop: 15,
    paddingHorizontal: 15,
    alignSelf: "center",
  },
  fechaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#eeeeee",
  },
  fechaText: {
    fontSize: 14,
    color: "#333",
  },
  contenidoPrincipal: {
    padding: 15,
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
  },
  seccionRegistro: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  filaMetricas: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  columnaMetricas: {
    flex: 1,
    marginHorizontal: 5,
  },
  etiquetaMetrica: {
    fontWeight: "bold",
    color: "#666",
    marginBottom: 3,
  },
  tituloSeccion: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.primary,
  },
  seccionPrendas: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
});

export default TarjetaRendimiento;
