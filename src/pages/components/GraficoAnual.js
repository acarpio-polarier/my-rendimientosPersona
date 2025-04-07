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
import { useNavigation } from "@react-navigation/native";
import FechaUtils from "../../helpers//FechaUtils";

const GraficoAnual = () => {
  // Navegación

  const navigation = useNavigation();

  const navegar = () => {
    navigation.navigate("DetalleRendimiento", {
      data: datosProcesados,
    });
  };

  // Estado
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [añoActual, setAñoActual] = useState(moment().year());
  const [cargando, setCargando] = useState(true);
  const [hayDatos, setHayDatos] = useState(true);
  const [datosProcesados, setDatosProcesados] = useState([]);

  // Efecto
  useEffect(() => {
    cargarDatos();
  }, [añoActual]);

  // Llamada
  const cargarDatos = () => {
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

        setDatosProcesados(datosProcesados);
        setData(datosProcesados.values);
        setLabels(datosProcesados.labels);
        setHayDatos(datosProcesados.values.some((value) => value > 0));
      })
      .catch((error) => {
        console.error("Error obteniendo datos:", error);
      })
      .finally(() => setCargando(false));
  };

  // Cambio de año
  const cambiarAño = (incremento) => {
    setAñoActual((prevAño) => prevAño + incremento);
    console.log("Informacion por mes:", datosProcesados);
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

        <TouchableOpacity style={styles.infoButton} onPress={navegar}>
          <MaterialCommunityIcons
            name="information-outline"
            size={22}
            color={colors.primary}
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
