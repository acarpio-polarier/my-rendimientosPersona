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
import BarraExpandible from "./BarraExpandible";
import DetalleRendimiento from "./DetalleRendimiento";
import { PERSONA_ID } from "../Index";

const GraficoAnual = () => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [añoActual, setAñoActual] = useState(moment().year());
  const [cargando, setCargando] = useState(true);
  const [hayDatos, setHayDatos] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, [añoActual]);

  const cargarDatos = () => {
    setCargando(true);
    const idPersona = PERSONA_ID;
    const fechaIni = `${añoActual}-01-01`;
    const fechaFin = `${añoActual}-12-31`;

    rendimientoPersonasService
      .getRendimientoPersonaMaquina(idPersona, fechaIni, fechaFin)
      .then((response) => {
        console.log(`Datos recibidos para ${añoActual}:`, response);
        const datosProcesados = procesarDatos(response);
        setData(datosProcesados.values);
        setLabels(datosProcesados.labels);
        setHayDatos(datosProcesados.values.some((value) => value > 0));
      })
      .catch((error) => {
        console.error("Error obteniendo datos:", error);
      })
      .finally(() => setCargando(false));
  };

  const cambiarAño = (incremento) => {
    setAñoActual((prevAño) => prevAño + incremento);
  };

  const procesarDatos = (data) => {
    const informacionMensual = {};
    const meses = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];

    data.forEach((item) => {
      const indiceMes = moment(item.fechaIni).month();
      if (!informacionMensual[indiceMes]) {
        informacionMensual[indiceMes] = { total: 0, count: 0 };
      }
      informacionMensual[indiceMes].total += item.RendimientoGlobal;
      informacionMensual[indiceMes].count += 1;
    });

    const values = Array(12)
      .fill(0)
      .map((_, i) => {
        if (informacionMensual[i]) {
          return (
            (informacionMensual[i].total / informacionMensual[i].count) * 100
          );
        }
        return 0;
      });

    return { labels: meses, values };
  };

  const renderizarContindoGrafico = () => {
    if (cargando) {
      return (
        <View style={styles.noDataContainer}>
          <ActivityIndicator size="large" color="#00C3A0" />
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
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.headerTexto}>Rendimiento anual</Text>
      </View>

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
      <View>{renderizarContindoGrafico()}</View>
      <BarraExpandible>
        <DetalleRendimiento />
      </BarraExpandible>
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
  noDataContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 220,
  },
  noDataText: {
    marginTop: 10,
    fontSize: 16,
    color: "#999",
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
  tabla: {
    flex: 1,
  },
  flechasSelectorAño: {
    color: "#edb637",
    padding: 6,
  },
});

export default GraficoAnual;
