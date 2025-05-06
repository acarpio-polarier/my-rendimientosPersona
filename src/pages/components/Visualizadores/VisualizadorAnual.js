import React, { useEffect, useState } from "react";
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
import RendimientoUtils from "../../../helpers/RendimientoUtils";
import { PERSONA_ID } from "../../Rendimiento/Index";
import { colors } from "../../../../styles/base";

const { width, height } = Dimensions.get("window");

const VisualizadorAnual = ({ data, mesSeleccionado, onValueChanged }) => {
  const mesesAbreviados = FechaUtils.nombresMesesCorto;
  const [tokensDiarios, setTokensDiarios] = useState([]);
  const [datos, setDatos] = useState([]);

  // Encuentra los datos del mes seleccionado
  const mesActual = data.infoPorMes.find(
    (mes) => mes.label === mesesAbreviados[mesSeleccionado]
  );

  useEffect(() => {
    getTokensPersona();
  }, [mesSeleccionado]);

  useEffect(() => {
    console.log("visual anual useEffect tokensDiarios", tokensDiarios);
    cargarDatos();
  }, [tokensDiarios]);

  // useEffect(() => {
  //   //Borrar
  //   console.log("VisualizadorAnual Lanzado");
  //   console.log("VisualizadorAnual Lanzado datos", data, onValueChanged);
  // }, []);

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

  // Junta dayEntries con los tokens en un objeto para mostrarlo en la tabla
  const cargarDatos = () => {
    const tableData = Object.entries(groupedData).map(
      ([diaCompleto, dayEntries]) => {
        const [dia, diaSemana] = diaCompleto.split("-");

        const rendimientoPromedio = (
          dayEntries.reduce((acc, obj) => acc + obj.RendimientoGlobal, 0) /
          dayEntries.length
        ).toFixed(2);

        const registros = dayEntries.length;

        // Compara las fechas del token y el fin del turno
        const tokensDelDia = tokensDiarios.filter((token) => {
          const tokenDate = new Date(token.fecha);
          return tokenDate.getDate() === parseInt(dia);
        });

        const cantidadTokens = tokensDelDia.reduce(
          (acc, token) => acc + (token.tokens ?? 0),
          0
        );

        return [dia, registros, `${rendimientoPromedio}%`, cantidadTokens];
      }
    );

    setDatos(tableData);
  };

  // sacar array de tokens por mes
  const getTokensPersona = async () => {
    console.log("visual anual mes -1: ", mesSeleccionado);
    const anio = data?.anio;
    const mes = (mesSeleccionado + 1).toString().padStart(2, "0");
    const fechaIni = `${anio}-${mes}-01`;
    const ultimoDia = new Date(anio, mes, 0).getDate();
    const fechaFin = `${anio}-${mes}-${ultimoDia.toString().padStart(2, "0")}`;
    console.log("visual anual fecha", fechaIni, fechaFin);
    const datos = await RendimientoUtils.getTokensPersona(
      PERSONA_ID,
      fechaIni,
      fechaFin
    );
    if (Array.isArray(datos)) {
      const tokensPersona = datos.map((item) => ({
        fecha: item.fecha ?? null,
        tokens: item.tokens ?? null,
      }));
      console.log("visual anual datos", datos);
      setTokensDiarios(tokensPersona);
    }
  };
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

  const HEIGHT_HEADER = 48;
  const HEIGHT_ROW = 48;
  const tablaHeight = HEIGHT_HEADER + data.length * HEIGHT_ROW;

  console.log("visual anual tokensDiarios", tokensDiarios);

  return (
    <View>
      <View style={styles.contenedorPrincipal}>
        {/* Tabla independiente */}
        <View style={[styles.tableContainer, { height: tablaHeight }]}>
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

          <DataTable style={{ height: "100%" }}>
            {datos.map((rowData, rowIndex) => (
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
                              { color: getColor(cell), fontSize: 17 },
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
    fontSize: 17,
  },
  wrapper: {
    flexDirection: "row",
  },
  scrollViewContent: {},
  head: {
    height: 44,
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
