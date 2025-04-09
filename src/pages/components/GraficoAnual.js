import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import { Line } from "react-native-svg";
import { rendimientoPersonasService } from "../../services/RendimientoPersonaService";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../styles/base";
import { PERSONA_ID } from "../Index";
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
  const dataPostMan = [
    {
      idPersona: 2162,
      idMaquina: 1283,
      fechaIni: "2024-04-15T14:11:34.0409431+02:00",
      fechaFin: "2024-04-15T15:18:40.0466481+02:00",
      idLavanderia: 14,
      denominacion: "PLEGADOR DE TOALLAS No.2 6C TEMATIC PRO",
      IntervaloTiempoSegundos: 4026.005705,
      IntervaloTiempoHoras: 1.12,
      TotalPrendas: 0,
      MediaPrendasPorHora: 0.0,
      DiccionarioPrendasPorTipo: {},
      RendimientoPorTipo: {},
      RendimientoGlobal: 0.0,
      RendimientoAcumulado: 0.0,
      HorasTrabajadasAcumuladas: 1.12,
      TotalPrendasAcumuladas: 0,
      MediaPrendasPorHoraAcumulada: 0.0,
    },
    {
      idPersona: 2162,
      idMaquina: 1428,
      fechaIni: "2024-04-15T15:19:00.047665+02:00",
      fechaFin: "2024-04-15T15:37:29.5140487+02:00",
      idLavanderia: 14,
      denominacion: "PLEGADOR DE TOALLAS No.1 6C TEMATIC PRO",
      IntervaloTiempoSegundos: 1109.4663837,
      IntervaloTiempoHoras: 0.31,
      TotalPrendas: 0,
      MediaPrendasPorHora: 0.0,
      DiccionarioPrendasPorTipo: {},
      RendimientoPorTipo: {},
      RendimientoGlobal: 0.0,
      RendimientoAcumulado: 0.0,
      HorasTrabajadasAcumuladas: 1.43,
      TotalPrendasAcumuladas: 0,
      MediaPrendasPorHoraAcumulada: 0.0,
    },
    {
      idPersona: 2162,
      idMaquina: 1283,
      fechaIni: "2024-04-15T15:37:29.5140487+02:00",
      fechaFin: "2024-04-15T18:01:01.7688912+02:00",
      idLavanderia: 14,
      denominacion: "PLEGADOR DE TOALLAS No.2 6C TEMATIC PRO",
      IntervaloTiempoSegundos: 8612.2548425,
      IntervaloTiempoHoras: 2.39,
      TotalPrendas: 0,
      MediaPrendasPorHora: 0.0,
      DiccionarioPrendasPorTipo: {},
      RendimientoPorTipo: {},
      RendimientoGlobal: 0.0,
      RendimientoAcumulado: 0.0,
      HorasTrabajadasAcumuladas: 3.82,
      TotalPrendasAcumuladas: 0,
      MediaPrendasPorHoraAcumulada: 0.0,
    },
    {
      idPersona: 2162,
      idMaquina: 1283,
      fechaIni: "2024-04-15T18:30:48.9324121+02:00",
      fechaFin: "2024-04-15T20:36:08.4284978+02:00",
      idLavanderia: 14,
      denominacion: "PLEGADOR DE TOALLAS No.2 6C TEMATIC PRO",
      IntervaloTiempoSegundos: 7519.4960857,
      IntervaloTiempoHoras: 2.09,
      TotalPrendas: 0,
      MediaPrendasPorHora: 0.0,
      DiccionarioPrendasPorTipo: {},
      RendimientoPorTipo: {},
      RendimientoGlobal: 0.0,
      RendimientoAcumulado: 0.0,
      HorasTrabajadasAcumuladas: 5.91,
      TotalPrendasAcumuladas: 0,
      MediaPrendasPorHoraAcumulada: 0.0,
    },
    {
      idPersona: 2162,
      idMaquina: 273,
      fechaIni: "2024-04-16T16:28:29.6656175+02:00",
      fechaFin: "2024-04-16T16:28:49.7181185+02:00",
      idLavanderia: 14,
      denominacion: "PLEGADOR DE TOALLAS No.7 6C TEMATIC PRO",
      IntervaloTiempoSegundos: 20.052501,
      IntervaloTiempoHoras: 0.01,
      TotalPrendas: 0,
      MediaPrendasPorHora: 0.0,
      DiccionarioPrendasPorTipo: {},
      RendimientoPorTipo: {},
      RendimientoGlobal: 0.0,
      RendimientoAcumulado: 0.0,
      HorasTrabajadasAcumuladas: 5.91,
      TotalPrendasAcumuladas: 0,
      MediaPrendasPorHoraAcumulada: 0.0,
    },
    {
      idPersona: 2162,
      idMaquina: 273,
      fechaIni: "2024-04-16T16:28:53.5018905+02:00",
      fechaFin: "2024-04-16T16:39:08.0987059+02:00",
      idLavanderia: 14,
      denominacion: "PLEGADOR DE TOALLAS No.7 6C TEMATIC PRO",
      IntervaloTiempoSegundos: 614.5968154,
      IntervaloTiempoHoras: 0.17,
      TotalPrendas: 0,
      MediaPrendasPorHora: 0.0,
      DiccionarioPrendasPorTipo: {},
      RendimientoPorTipo: {},
      RendimientoGlobal: 0.0,
      RendimientoAcumulado: 0.0,
      HorasTrabajadasAcumuladas: 6.08,
      TotalPrendasAcumuladas: 0,
      MediaPrendasPorHoraAcumulada: 0.0,
    },
    {
      idPersona: 2162,
      idMaquina: 559,
      fechaIni: "2024-04-16T16:39:46.8220597+02:00",
      fechaFin: "2024-04-16T17:30:54.1816143+02:00",
      idLavanderia: 14,
      denominacion: "PLEGADOR DE TOALLAS No.6 6C TEMATIC PRO",
      IntervaloTiempoSegundos: 3067.3595546,
      IntervaloTiempoHoras: 0.85,
      TotalPrendas: 0,
      MediaPrendasPorHora: 0.0,
      DiccionarioPrendasPorTipo: {},
      RendimientoPorTipo: {},
      RendimientoGlobal: 0.0,
      RendimientoAcumulado: 0.0,
      HorasTrabajadasAcumuladas: 6.94,
      TotalPrendasAcumuladas: 0,
      MediaPrendasPorHoraAcumulada: 0.0,
    },
    {
      idPersona: 2162,
      idMaquina: 559,
      fechaIni: "2024-04-16T17:31:42.1532697+02:00",
      fechaFin: "2024-04-16T18:00:37.2864293+02:00",
      idLavanderia: 14,
      denominacion: "PLEGADOR DE TOALLAS No.6 6C TEMATIC PRO",
      IntervaloTiempoSegundos: 1735.1331596,
      IntervaloTiempoHoras: 0.48,
      TotalPrendas: 0,
      MediaPrendasPorHora: 0.0,
      DiccionarioPrendasPorTipo: {},
      RendimientoPorTipo: {},
      RendimientoGlobal: 0.0,
      RendimientoAcumulado: 0.0,
      HorasTrabajadasAcumuladas: 7.42,
      TotalPrendasAcumuladas: 0,
      MediaPrendasPorHoraAcumulada: 0.0,
    },
    {
      idPersona: 2162,
      idMaquina: 559,
      fechaIni: "2024-04-16T18:30:10.2010073+02:00",
      fechaFin: "2024-04-16T18:30:11.6387385+02:00",
      idLavanderia: 14,
      denominacion: "PLEGADOR DE TOALLAS No.6 6C TEMATIC PRO",
      IntervaloTiempoSegundos: 1.4377312,
      IntervaloTiempoHoras: 0.0,
      TotalPrendas: 0,
      MediaPrendasPorHora: 0.0,
      DiccionarioPrendasPorTipo: {},
      RendimientoPorTipo: {},
      RendimientoGlobal: 0.0,
      RendimientoAcumulado: 0.0,
      HorasTrabajadasAcumuladas: 7.42,
      TotalPrendasAcumuladas: 0,
      MediaPrendasPorHoraAcumulada: 0.0,
    },
    {
      idPersona: 2162,
      idMaquina: 559,
      fechaIni: "2024-04-16T18:30:22.223072+02:00",
      fechaFin: "2024-04-16T20:38:22.6575645+02:00",
      idLavanderia: 14,
      denominacion: "PLEGADOR DE TOALLAS No.6 6C TEMATIC PRO",
      IntervaloTiempoSegundos: 7680.4344925,
      IntervaloTiempoHoras: 2.13,
      TotalPrendas: 0,
      MediaPrendasPorHora: 0.0,
      DiccionarioPrendasPorTipo: {},
      RendimientoPorTipo: {},
      RendimientoGlobal: 0.0,
      RendimientoAcumulado: 0.0,
      HorasTrabajadasAcumuladas: 9.55,
      TotalPrendasAcumuladas: 0,
      MediaPrendasPorHoraAcumulada: 0.0,
    },
    {
      idPersona: 2162,
      idMaquina: 1428,
      fechaIni: "2024-04-16T20:39:26.2337196+02:00",
      fechaFin: "2024-04-16T20:39:26.7997351+02:00",
      idLavanderia: 14,
      denominacion: "PLEGADOR DE TOALLAS No.1 6C TEMATIC PRO",
      IntervaloTiempoSegundos: 0.5660155,
      IntervaloTiempoHoras: 0.0,
      TotalPrendas: 0,
      MediaPrendasPorHora: 0.0,
      DiccionarioPrendasPorTipo: {},
      RendimientoPorTipo: {},
      RendimientoGlobal: 0.0,
      RendimientoAcumulado: 0.0,
      HorasTrabajadasAcumuladas: 9.55,
      TotalPrendasAcumuladas: 0,
      MediaPrendasPorHoraAcumulada: 0.0,
    },
    {
      idPersona: 2162,
      idMaquina: 1428,
      fechaIni: "2024-04-16T20:39:29.4176509+02:00",
      fechaFin: "2024-04-16T20:53:30.4592996+02:00",
      idLavanderia: 14,
      denominacion: "PLEGADOR DE TOALLAS No.1 6C TEMATIC PRO",
      IntervaloTiempoSegundos: 841.0416487,
      IntervaloTiempoHoras: 0.23,
      TotalPrendas: 0,
      MediaPrendasPorHora: 0.0,
      DiccionarioPrendasPorTipo: {},
      RendimientoPorTipo: {},
      RendimientoGlobal: 0.0,
      RendimientoAcumulado: 0.0,
      HorasTrabajadasAcumuladas: 9.79,
      TotalPrendasAcumuladas: 0,
      MediaPrendasPorHoraAcumulada: 0.0,
    },
    {
      idPersona: 2162,
      idMaquina: 1281,
      fechaIni: "2024-04-21T14:10:50.0003218+02:00",
      fechaFin: "2024-04-21T14:11:11.3364316+02:00",
      idLavanderia: 14,
      denominacion: "PLEGADOR DE TOALLAS No.5 6C TEMATIC PRO",
      IntervaloTiempoSegundos: 21.3361098,
      IntervaloTiempoHoras: 0.01,
      TotalPrendas: 0,
      MediaPrendasPorHora: 0.0,
      DiccionarioPrendasPorTipo: {},
      RendimientoPorTipo: {},
      RendimientoGlobal: 0.0,
      RendimientoAcumulado: 0.0,
      HorasTrabajadasAcumuladas: 9.79,
      TotalPrendasAcumuladas: 0,
      MediaPrendasPorHoraAcumulada: 0.0,
    },
    {
      idPersona: 2162,
      idMaquina: 1282,
      fechaIni: "2024-04-21T14:11:23.8661441+02:00",
      fechaFin: "2024-04-21T16:19:10.7275715+02:00",
      idLavanderia: 14,
      denominacion: "PLEGADOR DE TOALLAS No.3 6C TEMATIC PRO",
      IntervaloTiempoSegundos: 7666.8614274,
      IntervaloTiempoHoras: 2.13,
      TotalPrendas: 0,
      MediaPrendasPorHora: 0.0,
      DiccionarioPrendasPorTipo: {},
      RendimientoPorTipo: {},
      RendimientoGlobal: 0.0,
      RendimientoAcumulado: 0.0,
      HorasTrabajadasAcumuladas: 11.92,
      TotalPrendasAcumuladas: 0,
      MediaPrendasPorHoraAcumulada: 0.0,
    },
    {
      idPersona: 2162,
      idMaquina: 1282,
      fechaIni: "2024-04-22T15:18:02.0963035+02:00",
      fechaFin: "2024-04-22T15:48:52.4097143+02:00",
      idLavanderia: 14,
      denominacion: "PLEGADOR DE TOALLAS No.3 6C TEMATIC PRO",
      IntervaloTiempoSegundos: 1850.3134108,
      IntervaloTiempoHoras: 0.51,
      TotalPrendas: 0,
      MediaPrendasPorHora: 0.0,
      DiccionarioPrendasPorTipo: {},
      RendimientoPorTipo: {},
      RendimientoGlobal: 0.0,
      RendimientoAcumulado: 0.0,
      HorasTrabajadasAcumuladas: 12.44,
      TotalPrendasAcumuladas: 0,
      MediaPrendasPorHoraAcumulada: 0.0,
    },
  ];

  useEffect(() => {
    cargarDatos();
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

  const cambiarAño = (incremento) => {
    setAñoActual((prevAño) => prevAño + incremento);
  };

  // Función modificada: en lugar de navegar, muestra el modal
  const mostrarDetalles = () => {
    if (!cargando && hayDatos) {
      setModalVisible(true);
    }
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
        <View style={{ flexDirection: "row", height: 220, padding: 20 }}>
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
              gridMin={0}
              contentInset={{ top: 10, bottom: 10 }}
              svg={{ fill: "rgb(237, 182, 55)" }}
            >
              <Grid />
              <Line
                x1="2%"
                x2="98%"
                y1={`${50}%`}
                y2={`${50}%`}
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
            <Text style={styles.datoValor}>666</Text>
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
        <TouchableOpacity onPress={() => cambiarAño(1)}>
          <MaterialCommunityIcons
            style={styles.flechasSelectorAño}
            name="chevron-right"
            size={30}
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
    fontSize: 12,
    textAlign: "center",
  },
  datoValor: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoButton: {
    position: "absolute",
    right: 12,
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
