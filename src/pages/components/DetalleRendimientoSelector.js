import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { colors } from "../../../styles/base";
import DateUtils from "../../helpers/FechaUtils";
import VisualizadorSemanal from "./Visualizadores/VisualizadorSemanal";
import { rendimientoPersonasService } from "../../services/RendimientoPersonaService";
import { PERSONA_ID } from "../Index";

export default function DetalleRendimientoSelector() {
  // Hooks
  const navigation = useNavigation();
  const route = useRoute();

  // Estado inicial (puede recibir datos iniciales para la primera carga)
  const { datosPorDia: datosInicialesPorDia, modoInicial = "semanal" } =
    route.params || {};

  // Estados
  const [modo] = useState(modoInicial);
  const [seleccionActual, setSeleccionActual] = useState(0);
  const [rangoPeriodo, setRangoPeriodo] = useState(
    DateUtils.obtenerRangoSemana(0)
  );
  const [datosPorDia, setDatosPorDia] = useState(datosInicialesPorDia || []);
  const [cargando, setCargando] = useState(false);

  // Efecto para cargar datos cuando cambia la selección
  useEffect(() => {
    if (seleccionActual === 0 && datosInicialesPorDia) {
      // Si estamos en la semana actual y tenemos datos iniciales, usarlos
      setDatosPorDia(datosInicialesPorDia);
    } else {
      // En otro caso, cargar datos para la semana seleccionada
      const nuevoRango = DateUtils.obtenerRangoSemana(seleccionActual);
      setRangoPeriodo(nuevoRango);
      cargarDatosSemana(nuevoRango.inicioIso, nuevoRango.finIso);
    }
  }, [seleccionActual, datosInicialesPorDia]);

  // Función para cargar datos desde la API
  const cargarDatosSemana = async (fechaInicio, fechaFin) => {
    setCargando(true);
    try {
      console.log(`Cargando datos: ${fechaInicio} - ${fechaFin}`);

      const datos =
        await rendimientoPersonasService.getRendimientoPersonaMaquina(
          PERSONA_ID,
          fechaInicio,
          fechaFin
        );

      if (datos && datos.length > 0) {
        // Agrupar datos por día
        const datosAgrupados = DateUtils.agruparRegistrosPorDia(datos);
        console.log("Datos agrupados:", datosAgrupados.length, "días");
        setDatosPorDia(datosAgrupados);
      } else {
        console.log("No hay datos para esta semana");
        setDatosPorDia([]);
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setDatosPorDia([]);
    } finally {
      setCargando(false);
    }
  };

  // Función para seleccionar periodo anterior
  const periodoAnterior = () => {
    const nuevaSeleccion = seleccionActual + 1;
    setSeleccionActual(nuevaSeleccion);
  };

  // Función para seleccionar periodo siguiente (hasta la actual)
  const periodoSiguiente = () => {
    if (seleccionActual > 0) {
      const nuevaSeleccion = seleccionActual - 1;
      setSeleccionActual(nuevaSeleccion);
    }
  };

  // Renderizar el visualizador adecuado según el modo
  const renderizarVisualizador = () => {
    if (cargando) {
      return (
        <View style={styles.cargandoContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.cargandoTexto}>Cargando datos...</Text>
        </View>
      );
    }

    if (!datosPorDia || datosPorDia.length === 0) {
      return (
        <View style={styles.sinDatosContainer}>
          <MaterialCommunityIcons
            name="calendar-blank"
            size={40}
            color="#999"
          />
          <Text style={styles.sinDatosTexto}>
            No hay datos disponibles para esta semana.
          </Text>
        </View>
      );
    }

    if (modo === "semanal") {
      return (
        <VisualizadorSemanal
          data={datosPorDia}
          semanaActual={seleccionActual}
          rangoPeriodo={{
            fechaInicio: rangoPeriodo.inicioIso,
            fechaFin: rangoPeriodo.finIso,
          }}
        />
      );
    } else {
      // Para el modo anual/mensual
      return (
        <View style={styles.proximamenteContainer}>
          <Text style={styles.proximamenteTexto}>
            Visualizador mensual en desarrollo
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.contenedor}>
      {/* Título del contenido */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.headerText}>
          Rendimiento {modo === "semanal" ? "semanal" : "mensual"}
        </Text>
      </View>

      {/* Selector de periodo */}
      <View style={styles.contenido}>
        <View style={styles.selectorContainer}>
          <TouchableOpacity onPress={periodoAnterior} style={styles.button}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={30}
              color={colors.primary}
            />
          </TouchableOpacity>

          <View style={styles.dateRange}>
            <Text style={styles.dateText}>
              {rangoPeriodo.inicio} - {rangoPeriodo.fin}
            </Text>
            <Text style={styles.weekInfo}>
              {seleccionActual === 0
                ? modo === "semanal"
                  ? "Semana actual"
                  : "Mes actual"
                : `Hace ${seleccionActual} ${
                    modo === "semanal"
                      ? DateUtils.obtenerTextoSemana(seleccionActual)
                      : DateUtils.obtenerTextoMes(seleccionActual)
                  }`}
            </Text>
          </View>

          <TouchableOpacity
            onPress={periodoSiguiente}
            disabled={seleccionActual === 0}
            style={[
              styles.button,
              seleccionActual === 0 && styles.disabledButton,
            ]}
          >
            <MaterialCommunityIcons
              name="chevron-right"
              size={30}
              color={seleccionActual === 0 ? "#ccc" : colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Visualizador condicional */}
      <View style={styles.visualizadorContainer}>
        {renderizarVisualizador()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    width: "95%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
    marginVertical: 10,
  },
  header: {
    paddingVertical: 5,
    paddingHorizontal: 7,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  contenido: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  selectorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    width: "100%",
  },
  button: {
    padding: 8,
    backgroundColor: "transparent",
  },
  disabledButton: {
    opacity: 0.3,
  },
  dateRange: {
    marginHorizontal: 16,
    alignItems: "center",
  },
  dateText: {
    fontWeight: "500",
    fontSize: 16,
  },
  weekInfo: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  visualizadorContainer: {
    width: "100%",
    paddingBottom: 15,
  },
  proximamenteContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  proximamenteTexto: {
    color: "#666",
    fontSize: 14,
    fontStyle: "italic",
  },
  sinDatosContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sinDatosTexto: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    maxWidth: 200,
  },
  cargandoContainer: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  cargandoTexto: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
