import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { DataTable } from "react-native-paper";
import FechaUtils from "../../../helpers/FechaUtils";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../../styles/base";

const { width, height } = Dimensions.get("window");

const VisualizadorAnual = ({ data, mesSeleccionado, onValueChanged }) => {
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

  const registroDia = Object.entries(groupedData).map(
    ([diaCompleto, dayEntries]) => {
      // Separar día y nombre del día
      const [dia, diaSemana] = diaCompleto.split("-");
      console.log(" bbbbbbbbb", dayEntries);

      return {
        dia: dia,
        dayEntries: dayEntries.map((entry) => ({
          fechaIni: entry.fechaIni,
          fechaFin: entry.fechaFin,
          RendimientoGlobal: entry.RendimientoGlobal,
        })),
      };
    }
  );

  // Convertir a tabla de datos
  const tableData = Object.entries(groupedData).map(
    ([diaCompleto, dayEntries]) => {
      // Separar día y nombre del día
      const [dia, diaSemana] = diaCompleto.split("-");

      // Usar el último rendimiento acumulado del día
      const rendimientoPromedio = (
        dayEntries.reduce((acc, obj) => acc + obj.RendimientoGlobal, 0) /
        dayEntries.length
      ).toFixed(2);

      // Tokens para este día (aleatorio)
      const tokens = Math.floor(Math.random() * 10) + 1;

      // Número de registros para el día
      const registros = dayEntries.length;
      console.log("registros por dia", dayEntries);
      return [dia, registros, `${rendimientoPromedio}%`, tokens];
    }
  );
  const handleComparativa = () => {};

  // Calcular tokens totales
  const tokensTotal = tableData.reduce((total, entry) => total + entry[3], 0);

  // Calcular rendimiento medio
  const rendimientoMedio =
    tableData.length > 0
      ? tableData.reduce((sum, entry) => sum + parseFloat(entry[2]), 0) /
        tableData.length
      : 0;

  // Crear objetos de datos de cada fila
  const handleRowPress = (rowData) => {
    console.log("Fila presionada", `Datos: ${rowData.join(", ")}`);
    console.log("dataRow", rowData);
    const registroDiaFiltrado = registroDia.filter(
      (item) => item.dia === rowData[0]
    );

    const visibilidad = true;
    onValueChanged({
      visibilidad: visibilidad,
      registroDiaFiltrado: registroDiaFiltrado,
      intervalo: "diario",
    });
    console.log("registrosFiltrados", registroDiaFiltrado);
  };
  const getColor = (valor) => {
    console.log("valor", valor);
    const rend = parseFloat(valor.split("%")[0]);
    if (rend > 70 && rend < 90) return colors.warning;
    if (rend >= 90) return colors.success;
    return colors.danger;
  };

  const getBackgroundColor = (index) => {
    if (index % 2 != 0) return colors.smokedWhite;
    return colors.white;
  };

  return (
    <View>
      <View style={styles.contenedorPrincipal}>
        {/* Tabla independiente */}
        <View style={styles.tableContainer}>
          {/* Cabecera fija */}
          <DataTable>
            <DataTable.Header style={styles.cabeceraTabla}>
              <DataTable.Title style={styles.headerTitle}>
                <Text style={styles.headerText}>Día</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.headerTitle}>
                <Text style={styles.headerText}>Registros</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.headerTitle}>
                <Text style={styles.headerText}>Rendimiento</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.headerTitle}>
                <Text style={styles.headerText}>Tokens</Text>
              </DataTable.Title>
            </DataTable.Header>
          </DataTable>

          {/* Scroll solo en las filas */}
          <ScrollView nestedScrollEnabled={true} style={{ height: "94%" }}>
            <DataTable>
              {tableData.map((rowData, rowIndex) => (
                <TouchableOpacity
                  key={rowIndex}
                  onPress={() => handleRowPress(rowData)}
                >
                  <DataTable.Row
                    style={{
                      backgroundColor: getBackgroundColor(rowIndex),
                    }}
                  >
                    {rowData.map((cell, colIndex) => {
                      if (colIndex === 2) {
                        return (
                          <DataTable.Cell
                            key={colIndex}
                            style={{ justifyContent: "center" }}
                          >
                            <Text
                              style={[
                                styles.cellText,
                                { color: getColor(cell) },
                              ]}
                            >
                              {cell}
                            </Text>
                          </DataTable.Cell>
                        );
                      }
                      return (
                        <DataTable.Cell
                          key={colIndex}
                          style={{ justifyContent: "center" }}
                        >
                          <Text style={styles.cellText}>{cell}</Text>
                        </DataTable.Cell>
                      );
                    })}
                  </DataTable.Row>
                </TouchableOpacity>
              ))}
            </DataTable>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedorPrincipal: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: colors.smokedWhite,
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
    paddingBottom: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  cabeceraTabla: {
    backgroundColor: colors.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cabeceraTexto: {
    color: colors.white,
  },
  headerTitle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  headerText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },

  cellText: {
    textAlign: "center",
    width: "100%",
  },
  wrapper: {
    flexDirection: "row",
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  head: {
    height: 44,
    backgroundColor: colors.primary,
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
    backgroundColor: colors.primary,
  },
  headText: {
    margin: 6,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.white,
  },
  text: {
    fontSize: 16,
    height: "100%",
    width: "100%",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
    color: "#666",
  },
});

export default VisualizadorAnual;
