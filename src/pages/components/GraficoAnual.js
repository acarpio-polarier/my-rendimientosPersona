import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { PERSONA_ID } from "../Index";
import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import { Line } from "react-native-svg";
import { rendimientoPersonasService } from "../../services/RendimientoPersonaService";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../styles/base";
import RendimientoUtils from "../../helpers//RendimientoUtils";
import FechaUtils from "../../helpers//FechaUtils";
import DetalleRendimientoSelector from "./DetalleRendimientoSelector";
import ModalRendimiento from "./ModalRendimiento";

const GraficoAnual = () => {
  // Estado para controlar la visibilidad del modal
  const [modalVisible, setModalVisible] = useState(false);

  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [añoActual, setAñoActual] = useState(moment().year());
  const [cargando, setCargando] = useState(true);
  const [hayDatos, setHayDatos] = useState(true);
  const [datosProcesados, setDatosProcesados] = useState([]);
  const [tokensAnuales, setTokensAnuales] = useState();

  useEffect(() => {
    cargarDatos();
    getTokensPersonaPorFecha(PERSONA_ID, añoActual);
  }, [añoActual]);

  const cargarDatos = () => {
    // Si ya tenemos datos procesados para este año, no mostramos carga
    if (
      datosProcesados &&
      datosProcesados.anio === añoActual &&
      datosProcesados.values &&
      datosProcesados.values.length > 0
    ) {
      // Usar directamente los datos que ya tenemos
      setData(datosProcesados.values);
      setLabels(datosProcesados.labels);
      setHayDatos(datosProcesados.values.some((value) => value > 0));
      return;
    }

    // Solo mostrar carga si realmente necesitamos cargar nuevos datos
    setCargando(true);
    const idPersona = PERSONA_ID;
    const rangoAño = FechaUtils.obtenerRangoAño(añoActual);
    const fechaIni = rangoAño.inicio;
    const fechaFin = rangoAño.fin;

    rendimientoPersonasService
      .getRendimientoPersonaMaquina(idPersona, fechaIni, fechaFin)
      .then((response) => {
        console.log(`Datos recibidos para ${añoActual}:`, response);
        const datosProcesados = FechaUtils.procesarDatosAnuales(response);
        // Llamada

        // Añadir el año a los datos procesados para referencia
        datosProcesados.anio = añoActual;

        setDatosProcesados(datosProcesados);
        setData(datosProcesados.values);
        setLabels(datosProcesados.labels);
        setHayDatos(datosProcesados.values.some((value) => value > 0));
        console.log("Por mes: ", datosProcesados);
      })
      .catch((error) => {
        console.error("Error obteniendo datos:", error);
      })
      .finally(() => setCargando(false));
  };
  const getTokensPersonaPorFecha = async (idPersona, añoActual) => {
    try {
      console.log("Año actual", añoActual);
      const fechaInicio = `${añoActual}-01-01`;
      const fechaFin = `${añoActual}-12-31`;

      const datos = await RendimientoUtils.getTokensPersonaPorFecha(
        idPersona,
        fechaInicio,
        fechaFin
      );

      setTokensAnuales(datos?.TokensGanados ?? 0);
    } catch (error) {
      console.log(error);
    }
  };

  const cambiarAño = (incremento) => {
    setAñoActual((prevAño) => prevAño + incremento);
  };

  // Función modificada: en lugar de navegar, muestra el modal
  const mostrarDetalles = () => {
    if (!cargando && hayDatos) {
      setModalVisible(true);
    }
  };

  const calcularMediaGrafica = () => {
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    const midValue = (minValue + maxValue) / 2;

    return midValue;
  };

  const renderizarContindoGrafico = () => {
    if (cargando) {
      return (
        <View style={styles.noDataContainer}>
          <ActivityIndicator size="large" color={colors.info} />
          <Text style={styles.noDataText}>Cargando datos...</Text>
        </View>
      );
    } else if (!hayDatos) {
      return (
        <View style={styles.noDataContainer}>
          <MaterialCommunityIcons
            name="chart-line-variant"
            size={50}
            color="#999"
          />
          <Text style={styles.noDataText}>
            No hay datos disponibles para este año.
          </Text>
        </View>
      );
    } else {
      return (
        <TouchableOpacity onPress={mostrarDetalles}>
          <View style={{ flexDirection: "row", height: 220, padding: 10 }}>
            <YAxis
              data={data}
              contentInset={{ top: 10, bottom: 10 }}
              svg={{ fontSize: 10, fill: "black" }}
              formatLabel={(value) => `${value.toFixed(1)}%`}
            />

            <View style={{ flex: 1, marginLeft: 10 }}>
              <BarChart
                style={styles.tabla}
                data={data}
                gridMin={Math.min(...data)}
                gridMax={Math.max(...data)}
                contentInset={{ top: 0, bottom: 0 }}
                svg={{ fill: colors.primary }}
                spacingInner={0.3}
                spacingOuter={0.3}
              >
                <Grid />

                <Line
                  x1="2%"
                  x2="98%"
                  y1={calcularMediaGrafica()}
                  y2={calcularMediaGrafica()}
                  stroke="grey"
                  strokeDasharray={[4, 7]}
                  strokeWidth={2}
                />
              </BarChart>

              <XAxis
                data={labels.map((label, index) => index)}
                formatLabel={(index) => labels[index]}
                contentInset={{ left: 10, right: 10 }}
                svg={{ fontSize: 10, fill: "black" }}
              />
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.contenedor}>
      {/* Cabecera */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.headerTexto}>Rendimiento anual</Text>
      </View>

      {/* Información justo debajo del header - Tokens e ícono de información */}
      <View style={styles.infoSuperior}>
        <View style={styles.datosContainer}>
          <View style={styles.datoItem}>
            <Text style={styles.datoLabel}>Tokens</Text>
            <Text style={styles.datoValor}>{tokensAnuales}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.infoButton}
          onPress={mostrarDetalles}
          disabled={cargando || !hayDatos}
        >
          <MaterialCommunityIcons
            name="information-outline"
            size={22}
            color={cargando || !hayDatos ? "#ccc" : colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Selector de año */}
      <View style={styles.selectorAño}>
        <TouchableOpacity onPress={() => cambiarAño(-1)}>
          <MaterialCommunityIcons
            style={styles.flechasSelectorAño}
            name="chevron-left"
            size={30}
          />
        </TouchableOpacity>
        <Text style={styles.año}>{añoActual}</Text>
        <TouchableOpacity
          onPress={
            añoActual < new Date().getFullYear() ? () => cambiarAño(1) : null
          }
          disabled={añoActual === new Date().getFullYear()}
        >
          <MaterialCommunityIcons
            name="chevron-right"
            size={30}
            color={
              añoActual === new Date().getFullYear()
                ? colors.secondary
                : colors.primary
            }
          />
        </TouchableOpacity>
      </View>

      {/* Gráfico  */}
      <View>{renderizarContindoGrafico()}</View>

      {/* Modal para DetalleRendimientoSelector */}
      <ModalRendimiento
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={"Detalle de rendimiento anual"}
        blurIntensity="light"
      >
        <DetalleRendimientoSelector
          datosPorDia={[]}
          modoInicial="anual"
          datosAnuales={datosProcesados}
          anioSeleccionado={añoActual}
          mesSeleccionado={0} // Enero
        />
      </ModalRendimiento>
    </View>
  );
};

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
    fontFamily: "Arial",
  },
  header: {
    paddingVertical: 5,
    paddingHorizontal: 7,
  },
  headerTexto: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoSuperior: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  datosContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  datoItem: {
    alignItems: "center",
  },
  datoLabel: {
    color: "#666",
    fontSize: 20,
    textAlign: "center",
  },
  datoValor: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoButton: {
    position: "absolute",
    right: 15,
    padding: 5,
  },
  selectorAño: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  año: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 40,
  },
  flechasSelectorAño: {
    color: "#edb637",
    padding: 6,
  },
  tabla: {
    flex: 1,
  },
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 120,
    width: "100%",
  },
  noDataText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    maxWidth: 200,
  },
});

export default GraficoAnual;
