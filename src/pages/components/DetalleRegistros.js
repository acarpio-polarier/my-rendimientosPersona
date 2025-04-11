import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { DataTable } from "react-native-paper";

import { ScrollView } from "react-native";
import DateUtils from "../../helpers/FechaUtils";
import RendimientoUtils from "../../helpers/RendimientoUtils";
import { colors } from "../../../styles/base";

const baseFontSize = 16;

const DetalleRegistros = ({ dia = [] }) => {
  console.log("Datos recibidos:", dia);

  let data = [];
  const datosConTokens = dia.map((item) => ({
    ...item,
    tokens: RendimientoUtils.generarTokensRandom(),
  }));

  data = datosConTokens.map((item) => [
    DateUtils.obtenerRangoHora(item.fechaIni),
    DateUtils.obtenerRangoHora(item.fechaFin),
    item.RendimientoGlobal + "%",
    item.tokens,
  ]);

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

  console.log("data", data);

  return (
    <View>
      <View style={styles.contenedorPrincipal}>
        <View style={styles.tableContainer}>
          <DataTable style={{ height: "100%" }}>
            <DataTable.Header style={styles.cabeceraTabla}>
              <DataTable.Title style={styles.headerTitle}>
                <Text style={styles.headerText}>Hora Inicio</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.headerTitle}>
                <Text style={styles.headerText}>Hora Final</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.headerTitle}>
                <Text style={styles.headerText}>Rendimiento</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.headerTitle}>
                <Text style={styles.headerText}>Tokens</Text>
              </DataTable.Title>
            </DataTable.Header>

            <ScrollView nestedScrollEnabled={true} style={{ height: "94%" }}>
              {data.map((row, rowIndex) => (
                <DataTable.Row
                  key={rowIndex}
                  style={{ backgroundColor: getBackgroundColor(rowIndex) }}
                >
                  {row.map((cell, colIndex) => {
                    const cellStyle =
                      colIndex === 2
                        ? {
                            color: getColor(cell),
                            backgroundColor: getBackgroundColor(rowIndex),
                          }
                        : { backgroundColor: getBackgroundColor(rowIndex) };

                    return (
                      <DataTable.Cell
                        key={colIndex}
                        style={{ justifyContent: "center" }}
                      >
                        <Text style={{ color: cellStyle.color }}>{cell}</Text>
                      </DataTable.Cell>
                    );
                  })}
                </DataTable.Row>
              ))}
            </ScrollView>
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
    marginVertical: 10,
    paddingBottom: 100,
    maxHeight: "95%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  tableContainer: {
    width: "100%",
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

  cabeceraTabla: {
    backgroundColor: colors.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  tableBorder: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    maxHeight: "100%",
  },
  head: {
    height: 44,
    backgroundColor: "#FFF9E6",
  },
  headText: {
    margin: 6,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.white,
    fontSize: baseFontSize * 0.8,
  },
  row: {
    height: 44,
  },
  text: {
    fontSize: baseFontSize * 1,
    height: "100%",
    width: "100%",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  roundedWrapper: {
    padding: 12,
    flex: 1,
    width: "100%",
  },
});

export default DetalleRegistros;
