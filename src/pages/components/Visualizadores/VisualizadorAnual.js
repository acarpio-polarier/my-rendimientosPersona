import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Col,
} from "react-native-table-component";
import FechaUtils from "../../../helpers/FechaUtils";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../../styles/base";
const { width, height } = Dimensions.get("window");

const VisualizadorAnual = ({ data, mesSeleccionado }) => {
  const mesesAbreviados = FechaUtils.nombresMesesCorto;

  // Encuentra los datos del mes seleccionado
  const mesActual = data.infoPorMes.find(
    (mes) => mes.label === mesesAbreviados[mesSeleccionado]
  );

  // Si no hay datos para el mes, muestra un mensaje
  if (!mesActual || !mesActual.info || mesActual.info.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No hay datos para este mes</Text>
      </View>
    );
  }

  // Agrupar por día
  const groupedData = mesActual.info.reduce((acumulador, entrada) => {
    const clave = moment(entrada.fechaIni).format("DD-dddd");
    if (!acumulador[clave]) {
      acumulador[clave] = [];
    }
    acumulador[clave].push(entrada);
    return acumulador;
  }, {});

  // Convertir a tabla de datos
  const tableData = Object.entries(groupedData).map(
    ([diaCompleto, dayEntries]) => {
      // Separar día y nombre del día
      const [dia, diaSemana] = diaCompleto.split("-");

      // Usar el último rendimiento acumulado del día
      const rendimientoPromedio =
        dayEntries.length > 0
          ? dayEntries[dayEntries.length - 1].RendimientoAcumulado.toFixed(2)
          : "-";

      // Tokens para este día (aleatorio)
      const tokens = Math.floor(Math.random() * 10) + 1;

      // Número de registros para el día
      const registros = dayEntries.length;

      return [
        `${primeraEnMayuscula(diaSemana)} ${dia}`,
        registros,
        `${rendimientoPromedio}%`,
        tokens,
      ];
    }
  );
  // Ordenar por día para que aparezcan en orden cronológico

  // Calcular tokens totales
  const tokensTotal = tableData.reduce((total, entry) => total + entry[3], 0);

  // Calcular rendimiento medio
  const rendimientoMedio =
    tableData.length > 0
      ? tableData.reduce((sum, entry) => sum + parseFloat(entry[2]), 0) /
        tableData.length
      : 0;

  function primeraEnMayuscula(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleComparativa = () => {};

  return (
    <View style={styles.contenedorPrincipal}>
      {/* Información justo debajo del header */}
      <View style={styles.infoSuperior}>
        <View style={styles.datosContainer}>
          <View style={styles.datoItem}>
            <Text style={styles.datoLabel}>Tokens</Text>
            <Text style={styles.datoValor}>{tokensTotal}</Text>
          </View>
          <View style={styles.datoItem}>
            <Text style={styles.datoLabel}>Rendimiento</Text>
            <Text style={styles.datoValor}>{rendimientoMedio.toFixed(2)}%</Text>
          </View>
        </View>

        {/* Botón de información */}
        <TouchableOpacity onPress={handleComparativa}>
          <MaterialCommunityIcons
            name="arrow-all"
            size={20}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Tabla independiente */}
      <View style={styles.tableContainer}>
        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={styles.scrollViewContent}
        >
          <Table borderStyle={styles.tableBorder}>
            <Row
              data={["Día", "Registros", "Rendimiento", "Tokens"]}
              style={styles.head}
              textStyle={styles.headText}
              widthArr={[width * 0.2, width * 0.2, width * 0.26, width * 0.17]}
            />
            <TableWrapper style={styles.wrapper}>
              <Rows
                data={tableData}
                style={styles.row}
                textStyle={styles.text}
                widthArr={[
                  width * 0.2,
                  width * 0.2,
                  width * 0.26,
                  width * 0.17,
                ]}
              />
            </TableWrapper>
          </Table>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedorPrincipal: {
    width: "95%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
    maxHeight: height * 0.7,
  },
  wrapper: {
    flexDirection: "row",
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  head: {
    height: 44,
    backgroundColor: "#FFF9E6",
  },
  row: {
    height: 44,
  },
  infoSuperior: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    gap: 20,
    flex: 1,
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
  tableContainer: {
    width: "100%",
    flex: 1,
  },
  scrollViewContent: {
    alignItems: "center",
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  head: {
    height: 44,
    backgroundColor: "#FFF9E6",
  },
  headText: {
    margin: 6,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  text: {
    margin: 6,
    textAlign: "center",
    color: "#666",
  },
  noDataText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
    color: "#666",
  },
});

export default VisualizadorAnual;
